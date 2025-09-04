var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// data/siteMetadata.js
var require_siteMetadata = __commonJS({
  "data/siteMetadata.js"(exports, module) {
    var siteMetadata2 = {
      title: "Software Engineering & Design",
      author: "Brandon Bell",
      headerTitle: "Brandon Bell",
      description: "A blog created with Next.js and Tailwind.css",
      language: "en-us",
      theme: "system",
      // system, dark or light
      siteUrl: "https://tailwind-nextjs-starter-blog.vercel.app",
      siteRepo: "https://github.com/timlrx/tailwind-nextjs-starter-blog",
      siteLogo: "/static/images/logo.png",
      socialBanner: "/static/images/twitter-card.png",
      mastodon: "https://mastodon.social/@mastodonuser",
      email: "address@yoursite.com",
      github: "https://github.com",
      x: "https://twitter.com/x",
      // twitter: 'https://twitter.com/Twitter',
      facebook: "https://facebook.com",
      youtube: "https://youtube.com",
      linkedin: "https://www.linkedin.com",
      threads: "https://www.threads.net",
      instagram: "https://www.instagram.com",
      locale: "en-US",
      analytics: {
        // If you want to use an analytics provider you have to add it to the
        // content security policy in the `next.config.js` file.
        // supports Plausible, Simple Analytics, Umami, Posthog or Google Analytics.
        umamiAnalytics: {
          // We use an env variable for this site to avoid other users cloning our analytics ID
          umamiWebsiteId: process.env.NEXT_UMAMI_ID
          // e.g. 123e4567-e89b-12d3-a456-426614174000
          // You may also need to overwrite the script if you're storing data in the US - ex:
          // src: 'https://us.umami.is/script.js'
          // Remember to add 'us.umami.is' in `next.config.js` as a permitted domain for the CSP
        }
        // plausibleAnalytics: {
        //   plausibleDataDomain: '', // e.g. tailwind-nextjs-starter-blog.vercel.app
        // },
        // simpleAnalytics: {},
        // posthogAnalytics: {
        //   posthogProjectApiKey: '', // e.g. 123e4567-e89b-12d3-a456-426614174000
        // },
        // googleAnalytics: {
        //   googleAnalyticsId: '', // e.g. G-XXXXXXX
        // },
      },
      newsletter: {
        // supports mailchimp, buttondown, convertkit, klaviyo, revue, emailoctopus
        // Please add your .env file and modify it according to your selection
        provider: "buttondown"
      },
      comments: {
        // If you want to use an analytics provider you have to add it to the
        // content security policy in the `next.config.js` file.
        // Select a provider and use the environment variables associated to it
        // https://vercel.com/docs/environment-variables
        provider: "giscus",
        // supported providers: giscus, utterances, disqus
        giscusConfig: {
          // Visit the link below, and follow the steps in the 'configuration' section
          // https://giscus.app/
          repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
          repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
          category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
          categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
          mapping: "pathname",
          // supported options: pathname, url, title
          reactions: "1",
          // Emoji reactions: 1 = enable / 0 = disable
          // Send discussion metadata periodically to the parent window: 1 = enable / 0 = disable
          metadata: "0",
          // theme example: light, dark, dark_dimmed, dark_high_contrast
          // transparent_dark, preferred_color_scheme, custom
          theme: "light",
          // theme when dark mode
          darkTheme: "transparent_dark",
          // If the theme option above is set to 'custom`
          // please provide a link below to your custom theme css file.
          // example: https://giscus.app/themes/custom_example.css
          themeURL: "",
          // This corresponds to the `data-lang="en"` in giscus's configurations
          lang: "en"
        }
      },
      search: {
        provider: "kbar",
        // kbar or algolia
        kbarConfig: {
          searchDocumentsPath: "search.json"
          // path to load documents to search
        }
        // provider: 'algolia',
        // algoliaConfig: {
        //   // The application ID provided by Algolia
        //   appId: 'R2IYF7ETH7',
        //   // Public API key: it is safe to commit it
        //   apiKey: '599cec31baffa4868cae4e79f180729b',
        //   indexName: 'docsearch',
        // },
      }
    };
    module.exports = siteMetadata2;
  }
});

// node_modules/@notionhq/client/build/src/utils.js
var require_utils = __commonJS({
  "node_modules/@notionhq/client/build/src/utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isObject = exports.pick = exports.assertNever = void 0;
    function assertNever(value) {
      throw new Error(`Unexpected value should never occur: ${value}`);
    }
    exports.assertNever = assertNever;
    function pick(base, keys) {
      const entries = keys.map((key) => [key, base === null || base === void 0 ? void 0 : base[key]]);
      return Object.fromEntries(entries);
    }
    exports.pick = pick;
    function isObject(o) {
      return typeof o === "object" && o !== null;
    }
    exports.isObject = isObject;
  }
});

// node_modules/@notionhq/client/build/src/logging.js
var require_logging = __commonJS({
  "node_modules/@notionhq/client/build/src/logging.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.logLevelSeverity = exports.makeConsoleLogger = exports.LogLevel = void 0;
    var utils_1 = require_utils();
    var LogLevel;
    (function(LogLevel2) {
      LogLevel2["DEBUG"] = "debug";
      LogLevel2["INFO"] = "info";
      LogLevel2["WARN"] = "warn";
      LogLevel2["ERROR"] = "error";
    })(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
    function makeConsoleLogger(name) {
      return (level, message, extraInfo) => {
        console[level](`${name} ${level}:`, message, extraInfo);
      };
    }
    exports.makeConsoleLogger = makeConsoleLogger;
    function logLevelSeverity(level) {
      switch (level) {
        case LogLevel.DEBUG:
          return 20;
        case LogLevel.INFO:
          return 40;
        case LogLevel.WARN:
          return 60;
        case LogLevel.ERROR:
          return 80;
        default:
          return (0, utils_1.assertNever)(level);
      }
    }
    exports.logLevelSeverity = logLevelSeverity;
  }
});

// node_modules/@notionhq/client/build/src/errors.js
var require_errors = __commonJS({
  "node_modules/@notionhq/client/build/src/errors.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.buildRequestError = exports.APIResponseError = exports.UnknownHTTPResponseError = exports.isHTTPResponseError = exports.RequestTimeoutError = exports.isNotionClientError = exports.ClientErrorCode = exports.APIErrorCode = void 0;
    var utils_1 = require_utils();
    var APIErrorCode;
    (function(APIErrorCode2) {
      APIErrorCode2["Unauthorized"] = "unauthorized";
      APIErrorCode2["RestrictedResource"] = "restricted_resource";
      APIErrorCode2["ObjectNotFound"] = "object_not_found";
      APIErrorCode2["RateLimited"] = "rate_limited";
      APIErrorCode2["InvalidJSON"] = "invalid_json";
      APIErrorCode2["InvalidRequestURL"] = "invalid_request_url";
      APIErrorCode2["InvalidRequest"] = "invalid_request";
      APIErrorCode2["ValidationError"] = "validation_error";
      APIErrorCode2["ConflictError"] = "conflict_error";
      APIErrorCode2["InternalServerError"] = "internal_server_error";
      APIErrorCode2["ServiceUnavailable"] = "service_unavailable";
    })(APIErrorCode = exports.APIErrorCode || (exports.APIErrorCode = {}));
    var ClientErrorCode;
    (function(ClientErrorCode2) {
      ClientErrorCode2["RequestTimeout"] = "notionhq_client_request_timeout";
      ClientErrorCode2["ResponseError"] = "notionhq_client_response_error";
    })(ClientErrorCode = exports.ClientErrorCode || (exports.ClientErrorCode = {}));
    var NotionClientErrorBase = class extends Error {
    };
    function isNotionClientError(error) {
      return (0, utils_1.isObject)(error) && error instanceof NotionClientErrorBase;
    }
    exports.isNotionClientError = isNotionClientError;
    function isNotionClientErrorWithCode(error, codes) {
      return isNotionClientError(error) && error.code in codes;
    }
    var RequestTimeoutError = class _RequestTimeoutError extends NotionClientErrorBase {
      constructor(message = "Request to Notion API has timed out") {
        super(message);
        this.code = ClientErrorCode.RequestTimeout;
        this.name = "RequestTimeoutError";
      }
      static isRequestTimeoutError(error) {
        return isNotionClientErrorWithCode(error, {
          [ClientErrorCode.RequestTimeout]: true
        });
      }
      static rejectAfterTimeout(promise, timeoutMS) {
        return new Promise((resolve, reject) => {
          const timeoutId = setTimeout(() => {
            reject(new _RequestTimeoutError());
          }, timeoutMS);
          promise.then(resolve).catch(reject).then(() => clearTimeout(timeoutId));
        });
      }
    };
    exports.RequestTimeoutError = RequestTimeoutError;
    var HTTPResponseError = class extends NotionClientErrorBase {
      constructor(args) {
        super(args.message);
        this.name = "HTTPResponseError";
        const { code, status, headers, rawBodyText } = args;
        this.code = code;
        this.status = status;
        this.headers = headers;
        this.body = rawBodyText;
      }
    };
    var httpResponseErrorCodes = {
      [ClientErrorCode.ResponseError]: true,
      [APIErrorCode.Unauthorized]: true,
      [APIErrorCode.RestrictedResource]: true,
      [APIErrorCode.ObjectNotFound]: true,
      [APIErrorCode.RateLimited]: true,
      [APIErrorCode.InvalidJSON]: true,
      [APIErrorCode.InvalidRequestURL]: true,
      [APIErrorCode.InvalidRequest]: true,
      [APIErrorCode.ValidationError]: true,
      [APIErrorCode.ConflictError]: true,
      [APIErrorCode.InternalServerError]: true,
      [APIErrorCode.ServiceUnavailable]: true
    };
    function isHTTPResponseError(error) {
      if (!isNotionClientErrorWithCode(error, httpResponseErrorCodes)) {
        return false;
      }
      return true;
    }
    exports.isHTTPResponseError = isHTTPResponseError;
    var UnknownHTTPResponseError = class extends HTTPResponseError {
      constructor(args) {
        var _a;
        super({
          ...args,
          code: ClientErrorCode.ResponseError,
          message: (_a = args.message) !== null && _a !== void 0 ? _a : `Request to Notion API failed with status: ${args.status}`
        });
        this.name = "UnknownHTTPResponseError";
      }
      static isUnknownHTTPResponseError(error) {
        return isNotionClientErrorWithCode(error, {
          [ClientErrorCode.ResponseError]: true
        });
      }
    };
    exports.UnknownHTTPResponseError = UnknownHTTPResponseError;
    var apiErrorCodes = {
      [APIErrorCode.Unauthorized]: true,
      [APIErrorCode.RestrictedResource]: true,
      [APIErrorCode.ObjectNotFound]: true,
      [APIErrorCode.RateLimited]: true,
      [APIErrorCode.InvalidJSON]: true,
      [APIErrorCode.InvalidRequestURL]: true,
      [APIErrorCode.InvalidRequest]: true,
      [APIErrorCode.ValidationError]: true,
      [APIErrorCode.ConflictError]: true,
      [APIErrorCode.InternalServerError]: true,
      [APIErrorCode.ServiceUnavailable]: true
    };
    var APIResponseError = class extends HTTPResponseError {
      constructor() {
        super(...arguments);
        this.name = "APIResponseError";
      }
      static isAPIResponseError(error) {
        return isNotionClientErrorWithCode(error, apiErrorCodes);
      }
    };
    exports.APIResponseError = APIResponseError;
    function buildRequestError(response, bodyText) {
      const apiErrorResponseBody = parseAPIErrorResponseBody(bodyText);
      if (apiErrorResponseBody !== void 0) {
        return new APIResponseError({
          code: apiErrorResponseBody.code,
          message: apiErrorResponseBody.message,
          headers: response.headers,
          status: response.status,
          rawBodyText: bodyText
        });
      }
      return new UnknownHTTPResponseError({
        message: void 0,
        headers: response.headers,
        status: response.status,
        rawBodyText: bodyText
      });
    }
    exports.buildRequestError = buildRequestError;
    function parseAPIErrorResponseBody(body) {
      if (typeof body !== "string") {
        return;
      }
      let parsed;
      try {
        parsed = JSON.parse(body);
      } catch (parseError) {
        return;
      }
      if (!(0, utils_1.isObject)(parsed) || typeof parsed["message"] !== "string" || !isAPIErrorCode(parsed["code"])) {
        return;
      }
      return {
        ...parsed,
        code: parsed["code"],
        message: parsed["message"]
      };
    }
    function isAPIErrorCode(code) {
      return typeof code === "string" && code in apiErrorCodes;
    }
  }
});

// node_modules/@notionhq/client/build/src/api-endpoints.js
var require_api_endpoints = __commonJS({
  "node_modules/@notionhq/client/build/src/api-endpoints.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.oauthIntrospect = exports.oauthRevoke = exports.oauthToken = exports.getFileUpload = exports.completeFileUpload = exports.sendFileUpload = exports.listFileUploads = exports.createFileUpload = exports.listComments = exports.createComment = exports.search = exports.createDatabase = exports.listDatabases = exports.queryDatabase = exports.updateDatabase = exports.getDatabase = exports.appendBlockChildren = exports.listBlockChildren = exports.deleteBlock = exports.updateBlock = exports.getBlock = exports.getPageProperty = exports.updatePage = exports.getPage = exports.createPage = exports.listUsers = exports.getUser = exports.getSelf = void 0;
    exports.getSelf = {
      method: "get",
      pathParams: [],
      queryParams: [],
      bodyParams: [],
      path: () => `users/me`
    };
    exports.getUser = {
      method: "get",
      pathParams: ["user_id"],
      queryParams: [],
      bodyParams: [],
      path: (p) => `users/${p.user_id}`
    };
    exports.listUsers = {
      method: "get",
      pathParams: [],
      queryParams: ["start_cursor", "page_size"],
      bodyParams: [],
      path: () => `users`
    };
    exports.createPage = {
      method: "post",
      pathParams: [],
      queryParams: [],
      bodyParams: ["parent", "properties", "icon", "cover", "content", "children"],
      path: () => `pages`
    };
    exports.getPage = {
      method: "get",
      pathParams: ["page_id"],
      queryParams: ["filter_properties"],
      bodyParams: [],
      path: (p) => `pages/${p.page_id}`
    };
    exports.updatePage = {
      method: "patch",
      pathParams: ["page_id"],
      queryParams: [],
      bodyParams: ["properties", "icon", "cover", "archived", "in_trash"],
      path: (p) => `pages/${p.page_id}`
    };
    exports.getPageProperty = {
      method: "get",
      pathParams: ["page_id", "property_id"],
      queryParams: ["start_cursor", "page_size"],
      bodyParams: [],
      path: (p) => `pages/${p.page_id}/properties/${p.property_id}`
    };
    exports.getBlock = {
      method: "get",
      pathParams: ["block_id"],
      queryParams: [],
      bodyParams: [],
      path: (p) => `blocks/${p.block_id}`
    };
    exports.updateBlock = {
      method: "patch",
      pathParams: ["block_id"],
      queryParams: [],
      bodyParams: [
        "embed",
        "type",
        "archived",
        "in_trash",
        "bookmark",
        "image",
        "video",
        "pdf",
        "file",
        "audio",
        "code",
        "equation",
        "divider",
        "breadcrumb",
        "table_of_contents",
        "link_to_page",
        "table_row",
        "heading_1",
        "heading_2",
        "heading_3",
        "paragraph",
        "bulleted_list_item",
        "numbered_list_item",
        "quote",
        "to_do",
        "toggle",
        "template",
        "callout",
        "synced_block",
        "table",
        "column"
      ],
      path: (p) => `blocks/${p.block_id}`
    };
    exports.deleteBlock = {
      method: "delete",
      pathParams: ["block_id"],
      queryParams: [],
      bodyParams: [],
      path: (p) => `blocks/${p.block_id}`
    };
    exports.listBlockChildren = {
      method: "get",
      pathParams: ["block_id"],
      queryParams: ["start_cursor", "page_size"],
      bodyParams: [],
      path: (p) => `blocks/${p.block_id}/children`
    };
    exports.appendBlockChildren = {
      method: "patch",
      pathParams: ["block_id"],
      queryParams: [],
      bodyParams: ["children", "after"],
      path: (p) => `blocks/${p.block_id}/children`
    };
    exports.getDatabase = {
      method: "get",
      pathParams: ["database_id"],
      queryParams: [],
      bodyParams: [],
      path: (p) => `databases/${p.database_id}`
    };
    exports.updateDatabase = {
      method: "patch",
      pathParams: ["database_id"],
      queryParams: [],
      bodyParams: [
        "title",
        "description",
        "icon",
        "cover",
        "properties",
        "is_inline",
        "archived",
        "in_trash"
      ],
      path: (p) => `databases/${p.database_id}`
    };
    exports.queryDatabase = {
      method: "post",
      pathParams: ["database_id"],
      queryParams: ["filter_properties"],
      bodyParams: [
        "sorts",
        "filter",
        "start_cursor",
        "page_size",
        "archived",
        "in_trash"
      ],
      path: (p) => `databases/${p.database_id}/query`
    };
    exports.listDatabases = {
      method: "get",
      pathParams: [],
      queryParams: ["start_cursor", "page_size"],
      bodyParams: [],
      path: () => `databases`
    };
    exports.createDatabase = {
      method: "post",
      pathParams: [],
      queryParams: [],
      bodyParams: [
        "parent",
        "properties",
        "icon",
        "cover",
        "title",
        "description",
        "is_inline"
      ],
      path: () => `databases`
    };
    exports.search = {
      method: "post",
      pathParams: [],
      queryParams: [],
      bodyParams: ["sort", "query", "start_cursor", "page_size", "filter"],
      path: () => `search`
    };
    exports.createComment = {
      method: "post",
      pathParams: [],
      queryParams: [],
      bodyParams: ["parent", "rich_text", "discussion_id"],
      path: () => `comments`
    };
    exports.listComments = {
      method: "get",
      pathParams: [],
      queryParams: ["block_id", "start_cursor", "page_size"],
      bodyParams: [],
      path: () => `comments`
    };
    exports.createFileUpload = {
      method: "post",
      pathParams: [],
      queryParams: [],
      bodyParams: [
        "mode",
        "filename",
        "content_type",
        "number_of_parts",
        "external_url"
      ],
      path: () => `file_uploads`
    };
    exports.listFileUploads = {
      method: "get",
      pathParams: [],
      queryParams: ["status", "start_cursor", "page_size"],
      bodyParams: [],
      path: () => `file_uploads`
    };
    exports.sendFileUpload = {
      method: "post",
      pathParams: ["file_upload_id"],
      queryParams: [],
      bodyParams: [],
      formDataParams: ["file", "part_number"],
      path: (p) => `file_uploads/${p.file_upload_id}/send`
    };
    exports.completeFileUpload = {
      method: "post",
      pathParams: ["file_upload_id"],
      queryParams: [],
      bodyParams: [],
      path: (p) => `file_uploads/${p.file_upload_id}/complete`
    };
    exports.getFileUpload = {
      method: "get",
      pathParams: ["file_upload_id"],
      queryParams: [],
      bodyParams: [],
      path: (p) => `file_uploads/${p.file_upload_id}`
    };
    exports.oauthToken = {
      method: "post",
      pathParams: [],
      queryParams: [],
      bodyParams: ["grant_type", "code", "redirect_uri", "external_account"],
      path: () => `oauth/token`
    };
    exports.oauthRevoke = {
      method: "post",
      pathParams: [],
      queryParams: [],
      bodyParams: ["token"],
      path: () => `oauth/revoke`
    };
    exports.oauthIntrospect = {
      method: "post",
      pathParams: [],
      queryParams: [],
      bodyParams: ["token"],
      path: () => `oauth/introspect`
    };
  }
});

// node_modules/@notionhq/client/build/package.json
var require_package = __commonJS({
  "node_modules/@notionhq/client/build/package.json"(exports, module) {
    module.exports = {
      name: "@notionhq/client",
      version: "3.1.3",
      description: "A simple and easy to use client for the Notion API",
      engines: {
        node: ">=18"
      },
      homepage: "https://developers.notion.com/docs/getting-started",
      bugs: {
        url: "https://github.com/makenotion/notion-sdk-js/issues"
      },
      repository: {
        type: "git",
        url: "https://github.com/makenotion/notion-sdk-js/"
      },
      keywords: [
        "notion",
        "notionapi",
        "rest",
        "notion-api"
      ],
      main: "./build/src",
      types: "./build/src/index.d.ts",
      scripts: {
        prepare: "npm run build",
        prepublishOnly: "npm run checkLoggedIn && npm run lint && npm run test",
        build: "tsc",
        prettier: "prettier --write .",
        lint: "prettier --check . && eslint . --ext .ts && cspell '**/*' ",
        test: "jest ./test",
        "check-links": "git ls-files | grep md$ | xargs -n 1 markdown-link-check",
        prebuild: "npm run clean",
        clean: "rm -rf ./build",
        checkLoggedIn: "./scripts/verifyLoggedIn.sh"
      },
      author: "",
      license: "MIT",
      files: [
        "build/package.json",
        "build/src/**"
      ],
      devDependencies: {
        "@types/jest": "^28.1.4",
        "@typescript-eslint/eslint-plugin": "^5.39.0",
        "@typescript-eslint/parser": "^5.39.0",
        cspell: "^5.4.1",
        eslint: "^7.24.0",
        jest: "^28.1.2",
        "markdown-link-check": "^3.8.7",
        prettier: "^2.8.8",
        "ts-jest": "^28.0.5",
        typescript: "^4.8.4"
      }
    };
  }
});

// node_modules/@notionhq/client/build/src/Client.js
var require_Client = __commonJS({
  "node_modules/@notionhq/client/build/src/Client.js"(exports) {
    "use strict";
    var __classPrivateFieldSet = exports && exports.__classPrivateFieldSet || function(receiver, state, value, kind, f) {
      if (kind === "m")
        throw new TypeError("Private method is not writable");
      if (kind === "a" && !f)
        throw new TypeError("Private accessor was defined without a setter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
        throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
    };
    var __classPrivateFieldGet = exports && exports.__classPrivateFieldGet || function(receiver, state, kind, f) {
      if (kind === "a" && !f)
        throw new TypeError("Private accessor was defined without a getter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
        throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    };
    var _Client_auth;
    var _Client_logLevel;
    var _Client_logger;
    var _Client_prefixUrl;
    var _Client_timeoutMs;
    var _Client_notionVersion;
    var _Client_fetch;
    var _Client_agent;
    var _Client_userAgent;
    Object.defineProperty(exports, "__esModule", { value: true });
    var logging_1 = require_logging();
    var errors_1 = require_errors();
    var utils_1 = require_utils();
    var api_endpoints_1 = require_api_endpoints();
    var package_json_1 = require_package();
    var Client2 = class _Client {
      constructor(options) {
        var _a, _b, _c, _d, _e, _f;
        _Client_auth.set(this, void 0);
        _Client_logLevel.set(this, void 0);
        _Client_logger.set(this, void 0);
        _Client_prefixUrl.set(this, void 0);
        _Client_timeoutMs.set(this, void 0);
        _Client_notionVersion.set(this, void 0);
        _Client_fetch.set(this, void 0);
        _Client_agent.set(this, void 0);
        _Client_userAgent.set(this, void 0);
        this.blocks = {
          /**
           * Retrieve block
           */
          retrieve: (args) => {
            return this.request({
              path: api_endpoints_1.getBlock.path(args),
              method: api_endpoints_1.getBlock.method,
              query: (0, utils_1.pick)(args, api_endpoints_1.getBlock.queryParams),
              body: (0, utils_1.pick)(args, api_endpoints_1.getBlock.bodyParams),
              auth: args === null || args === void 0 ? void 0 : args.auth
            });
          },
          /**
           * Update block
           */
          update: (args) => {
            return this.request({
              path: api_endpoints_1.updateBlock.path(args),
              method: api_endpoints_1.updateBlock.method,
              query: (0, utils_1.pick)(args, api_endpoints_1.updateBlock.queryParams),
              body: (0, utils_1.pick)(args, api_endpoints_1.updateBlock.bodyParams),
              auth: args === null || args === void 0 ? void 0 : args.auth
            });
          },
          /**
           * Delete block
           */
          delete: (args) => {
            return this.request({
              path: api_endpoints_1.deleteBlock.path(args),
              method: api_endpoints_1.deleteBlock.method,
              query: (0, utils_1.pick)(args, api_endpoints_1.deleteBlock.queryParams),
              body: (0, utils_1.pick)(args, api_endpoints_1.deleteBlock.bodyParams),
              auth: args === null || args === void 0 ? void 0 : args.auth
            });
          },
          children: {
            /**
             * Append block children
             */
            append: (args) => {
              return this.request({
                path: api_endpoints_1.appendBlockChildren.path(args),
                method: api_endpoints_1.appendBlockChildren.method,
                query: (0, utils_1.pick)(args, api_endpoints_1.appendBlockChildren.queryParams),
                body: (0, utils_1.pick)(args, api_endpoints_1.appendBlockChildren.bodyParams),
                auth: args === null || args === void 0 ? void 0 : args.auth
              });
            },
            /**
             * Retrieve block children
             */
            list: (args) => {
              return this.request({
                path: api_endpoints_1.listBlockChildren.path(args),
                method: api_endpoints_1.listBlockChildren.method,
                query: (0, utils_1.pick)(args, api_endpoints_1.listBlockChildren.queryParams),
                body: (0, utils_1.pick)(args, api_endpoints_1.listBlockChildren.bodyParams),
                auth: args === null || args === void 0 ? void 0 : args.auth
              });
            }
          }
        };
        this.databases = {
          /**
           * List databases
           *
           * @deprecated Please use `search`
           */
          list: (args) => {
            return this.request({
              path: api_endpoints_1.listDatabases.path(),
              method: api_endpoints_1.listDatabases.method,
              query: (0, utils_1.pick)(args, api_endpoints_1.listDatabases.queryParams),
              body: (0, utils_1.pick)(args, api_endpoints_1.listDatabases.bodyParams),
              auth: args === null || args === void 0 ? void 0 : args.auth
            });
          },
          /**
           * Retrieve a database
           */
          retrieve: (args) => {
            return this.request({
              path: api_endpoints_1.getDatabase.path(args),
              method: api_endpoints_1.getDatabase.method,
              query: (0, utils_1.pick)(args, api_endpoints_1.getDatabase.queryParams),
              body: (0, utils_1.pick)(args, api_endpoints_1.getDatabase.bodyParams),
              auth: args === null || args === void 0 ? void 0 : args.auth
            });
          },
          /**
           * Query a database
           */
          query: (args) => {
            return this.request({
              path: api_endpoints_1.queryDatabase.path(args),
              method: api_endpoints_1.queryDatabase.method,
              query: (0, utils_1.pick)(args, api_endpoints_1.queryDatabase.queryParams),
              body: (0, utils_1.pick)(args, api_endpoints_1.queryDatabase.bodyParams),
              auth: args === null || args === void 0 ? void 0 : args.auth
            });
          },
          /**
           * Create a database
           */
          create: (args) => {
            return this.request({
              path: api_endpoints_1.createDatabase.path(),
              method: api_endpoints_1.createDatabase.method,
              query: (0, utils_1.pick)(args, api_endpoints_1.createDatabase.queryParams),
              body: (0, utils_1.pick)(args, api_endpoints_1.createDatabase.bodyParams),
              auth: args === null || args === void 0 ? void 0 : args.auth
            });
          },
          /**
           * Update a database
           */
          update: (args) => {
            return this.request({
              path: api_endpoints_1.updateDatabase.path(args),
              method: api_endpoints_1.updateDatabase.method,
              query: (0, utils_1.pick)(args, api_endpoints_1.updateDatabase.queryParams),
              body: (0, utils_1.pick)(args, api_endpoints_1.updateDatabase.bodyParams),
              auth: args === null || args === void 0 ? void 0 : args.auth
            });
          }
        };
        this.pages = {
          /**
           * Create a page
           */
          create: (args) => {
            return this.request({
              path: api_endpoints_1.createPage.path(),
              method: api_endpoints_1.createPage.method,
              query: (0, utils_1.pick)(args, api_endpoints_1.createPage.queryParams),
              body: (0, utils_1.pick)(args, api_endpoints_1.createPage.bodyParams),
              auth: args === null || args === void 0 ? void 0 : args.auth
            });
          },
          /**
           * Retrieve a page
           */
          retrieve: (args) => {
            return this.request({
              path: api_endpoints_1.getPage.path(args),
              method: api_endpoints_1.getPage.method,
              query: (0, utils_1.pick)(args, api_endpoints_1.getPage.queryParams),
              body: (0, utils_1.pick)(args, api_endpoints_1.getPage.bodyParams),
              auth: args === null || args === void 0 ? void 0 : args.auth
            });
          },
          /**
           * Update page properties
           */
          update: (args) => {
            return this.request({
              path: api_endpoints_1.updatePage.path(args),
              method: api_endpoints_1.updatePage.method,
              query: (0, utils_1.pick)(args, api_endpoints_1.updatePage.queryParams),
              body: (0, utils_1.pick)(args, api_endpoints_1.updatePage.bodyParams),
              auth: args === null || args === void 0 ? void 0 : args.auth
            });
          },
          properties: {
            /**
             * Retrieve page property
             */
            retrieve: (args) => {
              return this.request({
                path: api_endpoints_1.getPageProperty.path(args),
                method: api_endpoints_1.getPageProperty.method,
                query: (0, utils_1.pick)(args, api_endpoints_1.getPageProperty.queryParams),
                body: (0, utils_1.pick)(args, api_endpoints_1.getPageProperty.bodyParams),
                auth: args === null || args === void 0 ? void 0 : args.auth
              });
            }
          }
        };
        this.users = {
          /**
           * Retrieve a user
           */
          retrieve: (args) => {
            return this.request({
              path: api_endpoints_1.getUser.path(args),
              method: api_endpoints_1.getUser.method,
              query: (0, utils_1.pick)(args, api_endpoints_1.getUser.queryParams),
              body: (0, utils_1.pick)(args, api_endpoints_1.getUser.bodyParams),
              auth: args === null || args === void 0 ? void 0 : args.auth
            });
          },
          /**
           * List all users
           */
          list: (args) => {
            return this.request({
              path: api_endpoints_1.listUsers.path(),
              method: api_endpoints_1.listUsers.method,
              query: (0, utils_1.pick)(args, api_endpoints_1.listUsers.queryParams),
              body: (0, utils_1.pick)(args, api_endpoints_1.listUsers.bodyParams),
              auth: args === null || args === void 0 ? void 0 : args.auth
            });
          },
          /**
           * Get details about bot
           */
          me: (args) => {
            return this.request({
              path: api_endpoints_1.getSelf.path(),
              method: api_endpoints_1.getSelf.method,
              query: (0, utils_1.pick)(args, api_endpoints_1.getSelf.queryParams),
              body: (0, utils_1.pick)(args, api_endpoints_1.getSelf.bodyParams),
              auth: args === null || args === void 0 ? void 0 : args.auth
            });
          }
        };
        this.comments = {
          /**
           * Create a comment
           */
          create: (args) => {
            return this.request({
              path: api_endpoints_1.createComment.path(),
              method: api_endpoints_1.createComment.method,
              query: (0, utils_1.pick)(args, api_endpoints_1.createComment.queryParams),
              body: (0, utils_1.pick)(args, api_endpoints_1.createComment.bodyParams),
              auth: args === null || args === void 0 ? void 0 : args.auth
            });
          },
          /**
           * List comments
           */
          list: (args) => {
            return this.request({
              path: api_endpoints_1.listComments.path(),
              method: api_endpoints_1.listComments.method,
              query: (0, utils_1.pick)(args, api_endpoints_1.listComments.queryParams),
              body: (0, utils_1.pick)(args, api_endpoints_1.listComments.bodyParams),
              auth: args === null || args === void 0 ? void 0 : args.auth
            });
          }
        };
        this.fileUploads = {
          /**
           * Create a file upload
           */
          create: (args) => {
            return this.request({
              path: api_endpoints_1.createFileUpload.path(),
              method: api_endpoints_1.createFileUpload.method,
              query: (0, utils_1.pick)(args, api_endpoints_1.createFileUpload.queryParams),
              body: (0, utils_1.pick)(args, api_endpoints_1.createFileUpload.bodyParams),
              auth: args === null || args === void 0 ? void 0 : args.auth
            });
          },
          /**
           * Retrieve a file upload
           */
          retrieve: (args) => {
            return this.request({
              path: api_endpoints_1.getFileUpload.path(args),
              method: api_endpoints_1.getFileUpload.method,
              query: (0, utils_1.pick)(args, api_endpoints_1.getFileUpload.queryParams),
              auth: args === null || args === void 0 ? void 0 : args.auth
            });
          },
          /**
           * List file uploads
           */
          list: (args) => {
            return this.request({
              path: api_endpoints_1.listFileUploads.path(),
              method: api_endpoints_1.listFileUploads.method,
              query: (0, utils_1.pick)(args, api_endpoints_1.listFileUploads.queryParams),
              auth: args === null || args === void 0 ? void 0 : args.auth
            });
          },
          /**
           * Send a file upload
           *
           * Requires a `file_upload_id`, obtained from the `id` of the Create File
           * Upload API response.
           *
           * The `file` parameter contains the raw file contents or Blob/File object
           * under `file.data`, and an optional `file.filename` string.
           *
           * Supply a stringified `part_number` parameter when using file uploads
           * in multi-part mode.
           *
           * This endpoint sends HTTP multipart/form-data instead of JSON parameters.
           */
          send: (args) => {
            return this.request({
              path: api_endpoints_1.sendFileUpload.path(args),
              method: api_endpoints_1.sendFileUpload.method,
              query: (0, utils_1.pick)(args, api_endpoints_1.sendFileUpload.queryParams),
              formDataParams: (0, utils_1.pick)(args, api_endpoints_1.sendFileUpload.formDataParams),
              auth: args === null || args === void 0 ? void 0 : args.auth
            });
          },
          /**
           * Complete a file upload
           */
          complete: (args) => {
            return this.request({
              path: api_endpoints_1.completeFileUpload.path(args),
              method: api_endpoints_1.completeFileUpload.method,
              query: (0, utils_1.pick)(args, api_endpoints_1.completeFileUpload.queryParams),
              auth: args === null || args === void 0 ? void 0 : args.auth
            });
          }
        };
        this.search = (args) => {
          return this.request({
            path: api_endpoints_1.search.path(),
            method: api_endpoints_1.search.method,
            query: (0, utils_1.pick)(args, api_endpoints_1.search.queryParams),
            body: (0, utils_1.pick)(args, api_endpoints_1.search.bodyParams),
            auth: args === null || args === void 0 ? void 0 : args.auth
          });
        };
        this.oauth = {
          /**
           * Get token
           */
          token: (args) => {
            return this.request({
              path: api_endpoints_1.oauthToken.path(),
              method: api_endpoints_1.oauthToken.method,
              query: (0, utils_1.pick)(args, api_endpoints_1.oauthToken.queryParams),
              body: (0, utils_1.pick)(args, api_endpoints_1.oauthToken.bodyParams),
              auth: {
                client_id: args.client_id,
                client_secret: args.client_secret
              }
            });
          },
          /**
           * Introspect token
           */
          introspect: (args) => {
            return this.request({
              path: api_endpoints_1.oauthIntrospect.path(),
              method: api_endpoints_1.oauthIntrospect.method,
              query: (0, utils_1.pick)(args, api_endpoints_1.oauthIntrospect.queryParams),
              body: (0, utils_1.pick)(args, api_endpoints_1.oauthIntrospect.bodyParams),
              auth: {
                client_id: args.client_id,
                client_secret: args.client_secret
              }
            });
          },
          /**
           * Revoke token
           */
          revoke: (args) => {
            return this.request({
              path: api_endpoints_1.oauthRevoke.path(),
              method: api_endpoints_1.oauthRevoke.method,
              query: (0, utils_1.pick)(args, api_endpoints_1.oauthRevoke.queryParams),
              body: (0, utils_1.pick)(args, api_endpoints_1.oauthRevoke.bodyParams),
              auth: {
                client_id: args.client_id,
                client_secret: args.client_secret
              }
            });
          }
        };
        __classPrivateFieldSet(this, _Client_auth, options === null || options === void 0 ? void 0 : options.auth, "f");
        __classPrivateFieldSet(this, _Client_logLevel, (_a = options === null || options === void 0 ? void 0 : options.logLevel) !== null && _a !== void 0 ? _a : logging_1.LogLevel.WARN, "f");
        __classPrivateFieldSet(this, _Client_logger, (_b = options === null || options === void 0 ? void 0 : options.logger) !== null && _b !== void 0 ? _b : (0, logging_1.makeConsoleLogger)(package_json_1.name), "f");
        __classPrivateFieldSet(this, _Client_prefixUrl, `${(_c = options === null || options === void 0 ? void 0 : options.baseUrl) !== null && _c !== void 0 ? _c : "https://api.notion.com"}/v1/`, "f");
        __classPrivateFieldSet(this, _Client_timeoutMs, (_d = options === null || options === void 0 ? void 0 : options.timeoutMs) !== null && _d !== void 0 ? _d : 6e4, "f");
        __classPrivateFieldSet(this, _Client_notionVersion, (_e = options === null || options === void 0 ? void 0 : options.notionVersion) !== null && _e !== void 0 ? _e : _Client.defaultNotionVersion, "f");
        __classPrivateFieldSet(this, _Client_fetch, (_f = options === null || options === void 0 ? void 0 : options.fetch) !== null && _f !== void 0 ? _f : fetch, "f");
        __classPrivateFieldSet(this, _Client_agent, options === null || options === void 0 ? void 0 : options.agent, "f");
        __classPrivateFieldSet(this, _Client_userAgent, `notionhq-client/${package_json_1.version}`, "f");
      }
      /**
       * Sends a request.
       */
      async request(args) {
        const { path: path3, method, query, body, formDataParams, auth } = args;
        this.log(logging_1.LogLevel.INFO, "request start", { method, path: path3 });
        const bodyAsJsonString = !body || Object.entries(body).length === 0 ? void 0 : JSON.stringify(body);
        const url = new URL(`${__classPrivateFieldGet(this, _Client_prefixUrl, "f")}${path3}`);
        if (query) {
          for (const [key, value] of Object.entries(query)) {
            if (value !== void 0) {
              if (Array.isArray(value)) {
                for (const val of value) {
                  url.searchParams.append(key, decodeURIComponent(val));
                }
              } else {
                url.searchParams.append(key, String(value));
              }
            }
          }
        }
        let authorizationHeader;
        if (typeof auth === "object") {
          const unencodedCredential = `${auth.client_id}:${auth.client_secret}`;
          const encodedCredential = Buffer.from(unencodedCredential).toString("base64");
          authorizationHeader = { authorization: `Basic ${encodedCredential}` };
        } else {
          authorizationHeader = this.authAsHeaders(auth);
        }
        const headers = {
          ...authorizationHeader,
          "Notion-Version": __classPrivateFieldGet(this, _Client_notionVersion, "f"),
          "user-agent": __classPrivateFieldGet(this, _Client_userAgent, "f")
        };
        if (bodyAsJsonString !== void 0) {
          headers["content-type"] = "application/json";
        }
        let formData;
        if (formDataParams) {
          delete headers["content-type"];
          formData = new FormData();
          for (const [key, value] of Object.entries(formDataParams)) {
            if (typeof value === "string") {
              formData.append(key, value);
            } else if (typeof value === "object") {
              formData.append(key, typeof value.data === "object" ? value.data : new Blob([value.data]), value.filename);
            }
          }
        }
        try {
          const response = await errors_1.RequestTimeoutError.rejectAfterTimeout(__classPrivateFieldGet(this, _Client_fetch, "f").call(this, url.toString(), {
            method: method.toUpperCase(),
            headers,
            body: bodyAsJsonString !== null && bodyAsJsonString !== void 0 ? bodyAsJsonString : formData,
            agent: __classPrivateFieldGet(this, _Client_agent, "f")
          }), __classPrivateFieldGet(this, _Client_timeoutMs, "f"));
          const responseText = await response.text();
          if (!response.ok) {
            throw (0, errors_1.buildRequestError)(response, responseText);
          }
          const responseJson = JSON.parse(responseText);
          this.log(logging_1.LogLevel.INFO, "request success", { method, path: path3 });
          return responseJson;
        } catch (error) {
          if (!(0, errors_1.isNotionClientError)(error)) {
            throw error;
          }
          this.log(logging_1.LogLevel.WARN, "request fail", {
            code: error.code,
            message: error.message
          });
          if ((0, errors_1.isHTTPResponseError)(error)) {
            this.log(logging_1.LogLevel.DEBUG, "failed response body", {
              body: error.body
            });
          }
          throw error;
        }
      }
      /**
       * Emits a log message to the console.
       *
       * @param level The level for this message
       * @param args Arguments to send to the console
       */
      log(level, message, extraInfo) {
        if ((0, logging_1.logLevelSeverity)(level) >= (0, logging_1.logLevelSeverity)(__classPrivateFieldGet(this, _Client_logLevel, "f"))) {
          __classPrivateFieldGet(this, _Client_logger, "f").call(this, level, message, extraInfo);
        }
      }
      /**
       * Transforms an API key or access token into a headers object suitable for an HTTP request.
       *
       * This method uses the instance's value as the default when the input is undefined. If neither are defined, it returns
       * an empty object
       *
       * @param auth API key or access token
       * @returns headers key-value object
       */
      authAsHeaders(auth) {
        const headers = {};
        const authHeaderValue = auth !== null && auth !== void 0 ? auth : __classPrivateFieldGet(this, _Client_auth, "f");
        if (authHeaderValue !== void 0) {
          headers["authorization"] = `Bearer ${authHeaderValue}`;
        }
        return headers;
      }
    };
    exports.default = Client2;
    _Client_auth = /* @__PURE__ */ new WeakMap(), _Client_logLevel = /* @__PURE__ */ new WeakMap(), _Client_logger = /* @__PURE__ */ new WeakMap(), _Client_prefixUrl = /* @__PURE__ */ new WeakMap(), _Client_timeoutMs = /* @__PURE__ */ new WeakMap(), _Client_notionVersion = /* @__PURE__ */ new WeakMap(), _Client_fetch = /* @__PURE__ */ new WeakMap(), _Client_agent = /* @__PURE__ */ new WeakMap(), _Client_userAgent = /* @__PURE__ */ new WeakMap();
    Client2.defaultNotionVersion = "2022-06-28";
  }
});

// node_modules/@notionhq/client/build/src/helpers.js
var require_helpers = __commonJS({
  "node_modules/@notionhq/client/build/src/helpers.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isMentionRichTextItemResponse = exports.isEquationRichTextItemResponse = exports.isTextRichTextItemResponse = exports.isFullComment = exports.isFullUser = exports.isFullPageOrDatabase = exports.isFullDatabase = exports.isFullPage = exports.isFullBlock = exports.collectPaginatedAPI = exports.iteratePaginatedAPI = void 0;
    async function* iteratePaginatedAPI(listFn, firstPageArgs) {
      let nextCursor = firstPageArgs.start_cursor;
      do {
        const response = await listFn({
          ...firstPageArgs,
          start_cursor: nextCursor
        });
        yield* response.results;
        nextCursor = response.next_cursor;
      } while (nextCursor);
    }
    exports.iteratePaginatedAPI = iteratePaginatedAPI;
    async function collectPaginatedAPI(listFn, firstPageArgs) {
      const results = [];
      for await (const item of iteratePaginatedAPI(listFn, firstPageArgs)) {
        results.push(item);
      }
      return results;
    }
    exports.collectPaginatedAPI = collectPaginatedAPI;
    function isFullBlock(response) {
      return response.object === "block" && "type" in response;
    }
    exports.isFullBlock = isFullBlock;
    function isFullPage(response) {
      return response.object === "page" && "url" in response;
    }
    exports.isFullPage = isFullPage;
    function isFullDatabase(response) {
      return response.object === "database" && "title" in response;
    }
    exports.isFullDatabase = isFullDatabase;
    function isFullPageOrDatabase(response) {
      if (response.object === "database") {
        return isFullDatabase(response);
      } else {
        return isFullPage(response);
      }
    }
    exports.isFullPageOrDatabase = isFullPageOrDatabase;
    function isFullUser(response) {
      return "type" in response;
    }
    exports.isFullUser = isFullUser;
    function isFullComment(response) {
      return "created_by" in response;
    }
    exports.isFullComment = isFullComment;
    function isTextRichTextItemResponse(richText) {
      return richText.type === "text";
    }
    exports.isTextRichTextItemResponse = isTextRichTextItemResponse;
    function isEquationRichTextItemResponse(richText) {
      return richText.type === "equation";
    }
    exports.isEquationRichTextItemResponse = isEquationRichTextItemResponse;
    function isMentionRichTextItemResponse(richText) {
      return richText.type === "mention";
    }
    exports.isMentionRichTextItemResponse = isMentionRichTextItemResponse;
  }
});

// node_modules/@notionhq/client/build/src/index.js
var require_src = __commonJS({
  "node_modules/@notionhq/client/build/src/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isFullPageOrDatabase = exports.isFullComment = exports.isFullUser = exports.isFullPage = exports.isFullDatabase = exports.isFullBlock = exports.iteratePaginatedAPI = exports.collectPaginatedAPI = exports.isNotionClientError = exports.RequestTimeoutError = exports.UnknownHTTPResponseError = exports.APIResponseError = exports.ClientErrorCode = exports.APIErrorCode = exports.LogLevel = exports.Client = void 0;
    var Client_1 = require_Client();
    Object.defineProperty(exports, "Client", { enumerable: true, get: function() {
      return Client_1.default;
    } });
    var logging_1 = require_logging();
    Object.defineProperty(exports, "LogLevel", { enumerable: true, get: function() {
      return logging_1.LogLevel;
    } });
    var errors_1 = require_errors();
    Object.defineProperty(exports, "APIErrorCode", { enumerable: true, get: function() {
      return errors_1.APIErrorCode;
    } });
    Object.defineProperty(exports, "ClientErrorCode", { enumerable: true, get: function() {
      return errors_1.ClientErrorCode;
    } });
    Object.defineProperty(exports, "APIResponseError", { enumerable: true, get: function() {
      return errors_1.APIResponseError;
    } });
    Object.defineProperty(exports, "UnknownHTTPResponseError", { enumerable: true, get: function() {
      return errors_1.UnknownHTTPResponseError;
    } });
    Object.defineProperty(exports, "RequestTimeoutError", { enumerable: true, get: function() {
      return errors_1.RequestTimeoutError;
    } });
    Object.defineProperty(exports, "isNotionClientError", { enumerable: true, get: function() {
      return errors_1.isNotionClientError;
    } });
    var helpers_1 = require_helpers();
    Object.defineProperty(exports, "collectPaginatedAPI", { enumerable: true, get: function() {
      return helpers_1.collectPaginatedAPI;
    } });
    Object.defineProperty(exports, "iteratePaginatedAPI", { enumerable: true, get: function() {
      return helpers_1.iteratePaginatedAPI;
    } });
    Object.defineProperty(exports, "isFullBlock", { enumerable: true, get: function() {
      return helpers_1.isFullBlock;
    } });
    Object.defineProperty(exports, "isFullDatabase", { enumerable: true, get: function() {
      return helpers_1.isFullDatabase;
    } });
    Object.defineProperty(exports, "isFullPage", { enumerable: true, get: function() {
      return helpers_1.isFullPage;
    } });
    Object.defineProperty(exports, "isFullUser", { enumerable: true, get: function() {
      return helpers_1.isFullUser;
    } });
    Object.defineProperty(exports, "isFullComment", { enumerable: true, get: function() {
      return helpers_1.isFullComment;
    } });
    Object.defineProperty(exports, "isFullPageOrDatabase", { enumerable: true, get: function() {
      return helpers_1.isFullPageOrDatabase;
    } });
  }
});

// lib/notion-client.mjs
var notion_client_exports = {};
__export(notion_client_exports, {
  NotionClient: () => NotionClient
});
import { NotionToMarkdown } from "notion-to-md";
import fs from "fs";
import path from "path";
import crypto from "crypto";
var import_client, NotionClient;
var init_notion_client = __esm({
  "lib/notion-client.mjs"() {
    import_client = __toESM(require_src(), 1);
    NotionClient = class {
      constructor() {
        if (!process.env.NOTION_API_KEY) {
          throw new Error("NOTION_API_KEY environment variable is required");
        }
        this.client = new import_client.Client({ auth: process.env.NOTION_API_KEY });
        this.n2m = new NotionToMarkdown({ notionClient: this.client });
        this.cachePath = path.join(process.cwd(), "data/blog/notion/cache/notion-cache.json");
        this.cache = null;
      }
      async loadCache() {
        try {
          if (fs.existsSync(this.cachePath)) {
            const cacheData = fs.readFileSync(this.cachePath, "utf8");
            return JSON.parse(cacheData);
          }
        } catch (error) {
          console.warn("Failed to load cache:", error);
        }
        return null;
      }
      async saveCache(cache) {
        try {
          const cacheDir = path.dirname(this.cachePath);
          if (!fs.existsSync(cacheDir)) {
            fs.mkdirSync(cacheDir, { recursive: true });
          }
          fs.writeFileSync(this.cachePath, JSON.stringify(cache, null, 2));
        } catch (error) {
          console.error("Failed to save cache:", error);
        }
      }
      generateContentHash(posts) {
        const content = posts.map((p) => `${p.id}-${p.lastModified}`).join("|");
        return crypto.createHash("md5").update(content).digest("hex");
      }
      async fetchBlogPosts(databaseId) {
        this.cache = await this.loadCache();
        try {
          const response = await this.client.databases.query({
            database_id: databaseId,
            sorts: [{ property: "Date", direction: "descending" }]
            // Removed Draft filter - will include all posts for now
            // Add back when Draft property exists in database
          });
          const posts = [];
          for (const page of response.results) {
            if ("properties" in page) {
              const post = await this.processNotionPage(page);
              if (post) {
                posts.push(post);
              }
            }
          }
          const newContentHash = this.generateContentHash(posts);
          const hasChanged = !this.cache || this.cache.contentHash !== newContentHash || this.cache.databaseId !== databaseId;
          if (hasChanged) {
            this.cache = {
              lastFetched: (/* @__PURE__ */ new Date()).toISOString(),
              databaseId,
              posts: posts.reduce((acc, post) => ({ ...acc, [post.id]: post }), {}),
              contentHash: newContentHash
            };
            await this.saveCache(this.cache);
            console.log("Notion cache updated");
          } else {
            console.log("Using cached Notion content");
          }
          return posts;
        } catch (error) {
          console.error("Failed to fetch Notion posts:", error);
          if (this.cache) {
            return Object.values(this.cache.posts);
          }
          return [];
        }
      }
      async processNotionPage(page) {
        try {
          const properties = page.properties;
          const title = this.extractTextContent(properties.Title?.title) || "Untitled";
          const slug2 = this.extractTextContent(properties.Slug?.rich_text) || `notion-${page.id}`;
          const date = properties.Date?.date?.start || (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
          const tags = properties.Tags?.multi_select?.map((tag) => tag.name) || [];
          const summary = this.extractTextContent(properties.Summary?.rich_text) || "";
          const draft = properties.Draft?.checkbox || false;
          const authors = properties.Authors?.multi_select?.map((author) => author.name) || [];
          if (draft)
            return null;
          const mdBlocks = await this.n2m.pageToMarkdown(page.id);
          const content = this.n2m.toMarkdownString(mdBlocks);
          const cover = page.cover?.type === "external" ? page.cover.external.url : page.cover?.file?.url || "";
          return {
            id: page.id,
            title,
            slug: slug2,
            date,
            tags,
            summary,
            draft,
            layout: "PostLayout",
            authors,
            cover,
            content: content.parent,
            lastModified: page.last_edited_time || page.created_time
          };
        } catch (error) {
          console.error(`Failed to process page ${page.id}:`, error);
          return null;
        }
      }
      extractTextContent(richTextArray) {
        if (!richTextArray || richTextArray.length === 0)
          return "";
        return richTextArray.map((item) => item.plain_text || "").join("").trim();
      }
      async exportToMDX(posts, outputDir) {
        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir, { recursive: true });
        }
        for (const post of posts) {
          try {
            const mdxContent = this.generateMDXContent(post);
            const filePath = path.join(outputDir, `${post.slug}.mdx`);
            fs.writeFileSync(filePath, mdxContent, "utf8");
            console.log(`Exported: ${post.slug}.mdx`);
          } catch (error) {
            console.error(`Failed to export ${post.slug}:`, error);
          }
        }
      }
      generateMDXContent(post) {
        return `---
title: "${post.title.replace(/"/g, '\\"')}"
date: "${post.date}"
tags: ${JSON.stringify(post.tags)}
draft: ${post.draft}
summary: "${(post.summary || "").replace(/"/g, '\\"')}"
layout: "${post.layout}"
authors: ${JSON.stringify(post.authors)}
${post.cover ? `cover: "${post.cover}"` : ""}
lastmod: "${post.lastModified}"
---

${post.content}
`.trim();
      }
    };
  }
});

// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer2/source-files";
import { writeFileSync } from "fs";
import readingTime from "reading-time";
import { slug } from "github-slugger";
import path2 from "path";
import { fromHtmlIsomorphic } from "hast-util-from-html-isomorphic";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { remarkAlert } from "remark-github-blockquote-alert";
import {
  remarkExtractFrontmatter,
  remarkCodeTitles,
  remarkImgToJsx,
  extractTocHeadings
} from "pliny/mdx-plugins/index.js";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import rehypeCitation from "rehype-citation";
import rehypePrismPlus from "rehype-prism-plus";
import rehypePresetMinify from "rehype-preset-minify";
import { allCoreContent, sortPosts } from "pliny/utils/contentlayer.js";
var siteMetadata = require_siteMetadata();
var NOTION_ENABLED = process.env.NOTION_API_KEY && process.env.NOTION_DATABASE_ID;
async function translateNotionBlogsToMDX(databaseId, outputDir) {
  if (!NOTION_ENABLED) {
    console.log("Notion integration is disabled. Skipping Notion blog import.");
    return;
  }
  try {
    console.log("\u{1F504} Syncing Notion content...");
    const { notionClient } = await Promise.resolve().then(() => (init_notion_client(), notion_client_exports));
    const posts = await notionClient.fetchBlogPosts(databaseId);
    await notionClient.exportToMDX(posts, outputDir);
    console.log("\u2705 Notion content synced successfully");
  } catch (error) {
    console.error("\u274C Failed to sync Notion content:", error);
  }
}
async function fetchNotionBlogs(databaseId) {
  if (!NOTION_ENABLED)
    return [];
  try {
    const { notionClient } = await Promise.resolve().then(() => (init_notion_client(), notion_client_exports));
    const posts = await notionClient.fetchBlogPosts(databaseId);
    return posts.map((post) => ({
      object: void 0,
      id: post.id,
      title: post.title,
      slug: post.slug,
      date: post.date,
      tags: post.tags,
      summary: post.summary,
      draft: post.draft,
      layout: post.layout,
      authors: post.authors,
      images: post.cover ? [post.cover] : [],
      bibliography: "",
      canonicalUrl: ""
    }));
  } catch (error) {
    console.error("Failed to fetch Notion blogs:", error);
    return [];
  }
}
var root = process.cwd();
var isProduction = process.env.NODE_ENV === "production";
var icon = fromHtmlIsomorphic(
  `
  <span class="content-header-link">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 linkicon">
  <path d="M12.232 4.232a2.5 2.5 0 0 1 3.536 3.536l-1.225 1.224a.75.75 0 0 0 1.061 1.06l1.224-1.224a4 4 0 0 0-5.656-5.656l-3 3a4 4 0 0 0 .225 5.865.75.75 0 0 0 .977-1.138 2.5 2.5 0 0 1-.142-3.667l3-3Z" />
  <path d="M11.603 7.963a.75.75 0 0 0-.977 1.138 2.5 2.5 0 0 1 .142 3.667l-3 3a2.5 2.5 0 0 1-3.536-3.536l-1.225-1.224a.75.75 0 0 0-1.061-1.06l-1.224 1.224a4 4 0 1 0 5.656 5.656l3-3a4 4 0 0 0-.225-5.865Z" />
  </svg>
  </span>
`,
  { fragment: true }
);
var computedFields = {
  readingTime: { type: "json", resolve: (doc) => readingTime(doc.body.raw) },
  slug: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath.replace(/^.+?(\/)/, "")
  },
  path: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath
  },
  filePath: {
    type: "string",
    resolve: (doc) => doc._raw.sourceFilePath
  },
  toc: { type: "string", resolve: (doc) => extractTocHeadings(doc.body.raw) }
};
var Authors = defineDocumentType(() => ({
  name: "Authors",
  filePathPattern: "authors/**/*.mdx",
  contentType: "mdx",
  fields: {
    name: { type: "string", required: true },
    avatar: { type: "string" },
    occupation: { type: "string" },
    company: { type: "string" },
    email: { type: "string" },
    twitter: { type: "string" },
    linkedin: { type: "string" },
    github: { type: "string" },
    layout: { type: "string" }
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.replace(/^.+?(\/)/, "")
    },
    path: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath
    },
    filePath: {
      type: "string",
      resolve: (doc) => doc._raw.sourceFilePath
    }
  }
}));
var Blog = defineDocumentType(() => ({
  name: "Blog",
  filePathPattern: "blog/**/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    tags: { type: "list", of: { type: "string" }, default: [] },
    lastmod: { type: "date" },
    draft: { type: "boolean" },
    summary: { type: "string" },
    images: { type: "json" },
    cover: { type: "string" },
    authors: { type: "list", of: { type: "string" } },
    layout: { type: "string" },
    bibliography: { type: "string" },
    canonicalUrl: { type: "string" }
  },
  computedFields: {
    ...computedFields,
    structuredData: {
      type: "json",
      resolve: (doc) => ({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: doc.title,
        datePublished: doc.date,
        dateModified: doc.lastmod || doc.date,
        description: doc.summary,
        image: doc.images ? doc.images[0] : siteMetadata.socialBanner,
        url: `${siteMetadata.siteUrl}/${doc._raw.flattenedPath}`
      })
    }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "data",
  documentTypes: [Blog, Authors],
  disableImportAliasWarning: true,
  mdx: {
    cwd: process.cwd(),
    remarkPlugins: [
      remarkExtractFrontmatter,
      remarkGfm,
      remarkCodeTitles,
      remarkMath,
      remarkImgToJsx,
      remarkAlert
    ],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "prepend",
          headingProperties: {
            className: ["content-header"]
          },
          content: icon
        }
      ],
      rehypeKatex,
      [rehypeCitation, { path: path2.join(root, "data") }],
      [rehypePrismPlus, { defaultLanguage: "js", ignoreMissing: true }],
      rehypePresetMinify
    ]
  },
  onSuccess: async (importData) => {
    const { allBlogs: importedBlogs } = await importData();
    const allBlogs = importedBlogs.map((blog, index) => ({
      object: void 0,
      // No Notion object for non-Notion blogs
      id: blog.slug || `default-id-${index}`,
      title: blog.title,
      slug: blog.slug,
      date: blog.date,
      tags: blog.tags,
      summary: blog.summary,
      draft: blog.draft,
      layout: blog.layout,
      authors: blog.authors,
      images: blog.images,
      bibliography: blog.bibliography,
      canonicalUrl: blog.canonicalUrl
    }));
    allBlogs.forEach((blog) => {
    });
    if (NOTION_ENABLED) {
      const notionOutputDir = path2.join(process.cwd(), "data/blog/notion");
      await translateNotionBlogsToMDX(process.env.NOTION_DATABASE_ID || "", notionOutputDir);
      console.log("Notion blogs have been translated to MDX and saved.");
    } else {
      console.log("Notion integration is disabled. Skipping Notion blog import.");
    }
  }
});
export {
  Authors,
  Blog,
  contentlayer_config_default as default,
  fetchNotionBlogs,
  translateNotionBlogsToMDX
};
//# sourceMappingURL=compiled-contentlayer-config-F3A2ZTEV.mjs.map
