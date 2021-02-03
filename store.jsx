import React, {
  useEffect,
  useState,
  useMemo,
  useContext,
  createContext,
} from 'react';

import getConfig from 'next/config';
import cookie from 'js-cookie';
import FeathersClient from '@feathersjs/feathers';
import RestClient from '@feathersjs/rest-client';
import AuthClient from '@feathersjs/authentication-client';
import Axios from 'axios';
import { CookieStorage } from 'cookie-storage';
import FindOne from 'feathers-findone';
import { addDays } from 'date-fns';
import LocalForage from 'localforage';
import decode from 'jwt-decode';

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
const { sV2Domain } = serverRuntimeConfig;
const { publicSV2Domain } = publicRuntimeConfig;

const StoreContext = createContext({});
const AuthStoreContext = createContext({});

/**
 * @function ApiProvider Auth store provider
 */
export function ApiProvider({ children }) {
  // The query string parsed to an object.
  // It will be an empty object during prerendering if the
  // page doesn't have data fetching requirements.

  // keep memoised feathers client instance
  const feathers = useMemo(() => {
    let storage;
    let apiDomain = sV2Domain;

    if (typeof window === 'object') {
      storage = new CookieStorage({
        path: '/',
        secure: false,
        expires: addDays(new Date(), 365),
      });
      apiDomain = publicSV2Domain;
    }

    // setup feathers client
    const app = FeathersClient();
    const rest = RestClient(apiDomain);
    app.configure(rest.axios(Axios));

    // auth client setup with cookie name and storage
    app.configure(AuthClient({ storageKey: '__ht', storage }));

    // configure findOne method
    app.configure(FindOne());

    // return feathers instance
    return app;
  }, []);

  return <StoreContext.Provider value={feathers}>{children}</StoreContext.Provider>;
}

/**
 * @method useApi hook for using feathers api
 * @example const feathers = useApi();
 */
export function useApi() {
  return useContext(StoreContext);
}

/**
 * @method useService hook for using feathers service
 * @example
 * const invoices = useService<InvoiceType>(`/businessses/${urlKey}/invoices`);
 * const lastInvoice = invoices.findOne({
 *  query: {
 *    status: { $ne: 'DRAFT' },
 *    billType: 'INVOICE',
 *    $limit: 1,
 *    $sort: { createdAt: -1 },
 *  }
 * });
 */
export function useService(service) {
  const feathers = useContext(StoreContext);
  return feathers.service(service);
}

/**
 * @function AuthProvider Auth store provider
 */
export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  /* decoded jwt to use while user auth hydration is still in flight */
  const [jwt, setJwt] = useState(null);
  const [user, setUser] = useState(null);

  const feathers = useApi();

  /* listen for login event, login is possible using
  feathers.authenticate or via login method
  reAuthenticate call from hydration is also listend here
  */
  useEffect(() => {
    const updateUser = (u) => {
      // update both user and token on login
      cookie.set('__ht', u.accessToken, { expires: 365 });
      setUser(u);
      setToken(u.accessToken);
      // update userinfo in localstorage
      const {
        name, email, avatar, googlePicture, googleId,
      } = u;
      LocalForage.setItem('UserInfo', {
        name,
        email,
        avatar,
        googleLogin: !!googleId,
        googlePicture,
      });
    };
    feathers.on('login', updateUser);
    return () => feathers.off('login', updateUser);
  }, []);

  /* keep a decoded copy of token */
  useEffect(() => {
    if (token) {
      try {
        setJwt(decode(token));
      } catch (e) {
        setToken(null);
      }
    }
  }, [token]);

  /**
   * @method login proxy to feathers.authenticate with default strategy as local
   * @param {AuthenticationRequest} auth feathers auth payload
   * @param {Params} [params] auth service params including headers
   * @retusn {Promise<AuthenticationResult>} Promise which resolves with user
   * @example const user = await login({ email, password });
   * @example const user = await login({ accessToken });
   */
  function login(auth, params) {
    let { strategy = 'local' } = auth;
    const { accessToken } = auth;
    if (accessToken) {
      strategy = 'jwt';
    }
    return feathers
      .authenticate(
        {
          ...auth,
          strategy,
        },
        params,
      )
      .then((authResult) => authResult);
  }

  /**
   * @method logout remove token and reset feathers
   * @param {boolean} refresh refresh the page after logout
   * @description this logout is preferred over feathers logout
   */
  function logout(refresh) {
    setUser(null);
    setToken(null);
    return feathers.authentication
      .removeAccessToken()
      .then(() => feathers.authentication.reset())
      .then(() => {
        if (refresh) {
          window.location.reload();
        } else {
          window.location.href = '/login';
        }
      });
  }

  useEffect(() => {
    feathers.authentication
      .getAccessToken()
      .then(setToken)
      .catch(() => setToken(null));
    feathers.reAuthenticate().catch(() => {
      setToken(null);
      // prompt google one tap login if the user isnt logged in
    });
  }, []);

  const contextValue = {
    token,
    jwt,
    user,
    login,
    logout,
  };

  return <AuthStoreContext.Provider value={contextValue}>{children}</AuthStoreContext.Provider>;
}

/**
 * @method useAuth auth provider hook
 * @example const { user, login, logout } = useAuth();
 */
export function useAuth() {
  return useContext(AuthStoreContext);
}

/**
 * @method StoreProvider providers single store
 */
export default function StoreProvider({ children }) {
  return (
    <ApiProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </ApiProvider>
  );
}
