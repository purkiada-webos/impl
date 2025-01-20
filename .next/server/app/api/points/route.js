/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/points/route";
exports.ids = ["app/api/points/route"];
exports.modules = {

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "fs/promises":
/*!******************************!*\
  !*** external "fs/promises" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("fs/promises");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fpoints%2Froute&page=%2Fapi%2Fpoints%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fpoints%2Froute.ts&appDir=%2FUsers%2Fsunightmc%2FDocuments%2FSource%20Code%2FSchool%2FPurkiada%2Ffrontend%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fsunightmc%2FDocuments%2FSource%20Code%2FSchool%2FPurkiada%2Ffrontend&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fpoints%2Froute&page=%2Fapi%2Fpoints%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fpoints%2Froute.ts&appDir=%2FUsers%2Fsunightmc%2FDocuments%2FSource%20Code%2FSchool%2FPurkiada%2Ffrontend%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fsunightmc%2FDocuments%2FSource%20Code%2FSchool%2FPurkiada%2Ffrontend&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_sunightmc_Documents_Source_Code_School_Purkiada_frontend_app_api_points_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/points/route.ts */ \"(rsc)/./app/api/points/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/points/route\",\n        pathname: \"/api/points\",\n        filename: \"route\",\n        bundlePath: \"app/api/points/route\"\n    },\n    resolvedPagePath: \"/Users/sunightmc/Documents/Source Code/School/Purkiada/frontend/app/api/points/route.ts\",\n    nextConfigOutput,\n    userland: _Users_sunightmc_Documents_Source_Code_School_Purkiada_frontend_app_api_points_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZwb2ludHMlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRnBvaW50cyUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRnBvaW50cyUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRnN1bmlnaHRtYyUyRkRvY3VtZW50cyUyRlNvdXJjZSUyMENvZGUlMkZTY2hvb2wlMkZQdXJraWFkYSUyRmZyb250ZW5kJTJGYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj0lMkZVc2VycyUyRnN1bmlnaHRtYyUyRkRvY3VtZW50cyUyRlNvdXJjZSUyMENvZGUlMkZTY2hvb2wlMkZQdXJraWFkYSUyRmZyb250ZW5kJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUN1QztBQUNwSDtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiL1VzZXJzL3N1bmlnaHRtYy9Eb2N1bWVudHMvU291cmNlIENvZGUvU2Nob29sL1B1cmtpYWRhL2Zyb250ZW5kL2FwcC9hcGkvcG9pbnRzL3JvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9wb2ludHMvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9wb2ludHNcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL3BvaW50cy9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIi9Vc2Vycy9zdW5pZ2h0bWMvRG9jdW1lbnRzL1NvdXJjZSBDb2RlL1NjaG9vbC9QdXJraWFkYS9mcm9udGVuZC9hcHAvYXBpL3BvaW50cy9yb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fpoints%2Froute&page=%2Fapi%2Fpoints%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fpoints%2Froute.ts&appDir=%2FUsers%2Fsunightmc%2FDocuments%2FSource%20Code%2FSchool%2FPurkiada%2Ffrontend%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fsunightmc%2FDocuments%2FSource%20Code%2FSchool%2FPurkiada%2Ffrontend&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(rsc)/./app/api/points/route.ts":
/*!*********************************!*\
  !*** ./app/api/points/route.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var fs_promises__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fs/promises */ \"fs/promises\");\n/* harmony import */ var fs_promises__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fs_promises__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nconst POINTS_FILE = path__WEBPACK_IMPORTED_MODULE_2___default().join(process.cwd(), 'data', 'points.json');\n// Ensure data directory exists\nasync function ensureDataDir() {\n    const dir = path__WEBPACK_IMPORTED_MODULE_2___default().join(process.cwd(), 'data');\n    try {\n        await fs_promises__WEBPACK_IMPORTED_MODULE_1___default().access(dir);\n    } catch  {\n        await fs_promises__WEBPACK_IMPORTED_MODULE_1___default().mkdir(dir, {\n            recursive: true\n        });\n    }\n}\n// Read points data\nasync function readPointsData() {\n    try {\n        await ensureDataDir();\n        const data = await fs_promises__WEBPACK_IMPORTED_MODULE_1___default().readFile(POINTS_FILE, 'utf-8');\n        return JSON.parse(data);\n    } catch  {\n        return {};\n    }\n}\n// Write points data\nasync function writePointsData(data) {\n    await ensureDataDir();\n    await fs_promises__WEBPACK_IMPORTED_MODULE_1___default().writeFile(POINTS_FILE, JSON.stringify(data, null, 2));\n}\nasync function GET(request) {\n    const { searchParams } = new URL(request.url);\n    const userId = searchParams.get('userId');\n    if (!userId) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'User ID is required'\n        }, {\n            status: 400\n        });\n    }\n    const data = await readPointsData();\n    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n        points: data[userId] || 0\n    });\n}\nasync function POST(request) {\n    const { userId, action, amount } = await request.json();\n    if (!userId || !action || !amount) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'Missing required fields'\n        }, {\n            status: 400\n        });\n    }\n    const data = await readPointsData();\n    data[userId] = data[userId] || 0;\n    switch(action){\n        case 'initialize':\n            if (data[userId] === undefined) {\n                data[userId] = 10;\n            }\n            break;\n        case 'add':\n            data[userId] += amount;\n            break;\n        case 'subtract':\n            data[userId] = Math.max(0, data[userId] - amount);\n            break;\n        default:\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'Invalid action'\n            }, {\n                status: 400\n            });\n    }\n    await writePointsData(data);\n    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n        points: data[userId]\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3BvaW50cy9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQTJDO0FBQ2Q7QUFDTDtBQUV4QixNQUFNRyxjQUFjRCxnREFBUyxDQUFDRyxRQUFRQyxHQUFHLElBQUksUUFBUTtBQUVyRCwrQkFBK0I7QUFDL0IsZUFBZUM7SUFDYixNQUFNQyxNQUFNTixnREFBUyxDQUFDRyxRQUFRQyxHQUFHLElBQUk7SUFDckMsSUFBSTtRQUNGLE1BQU1MLHlEQUFTLENBQUNPO0lBQ2xCLEVBQUUsT0FBTTtRQUNOLE1BQU1QLHdEQUFRLENBQUNPLEtBQUs7WUFBRUcsV0FBVztRQUFLO0lBQ3hDO0FBQ0Y7QUFFQSxtQkFBbUI7QUFDbkIsZUFBZUM7SUFDYixJQUFJO1FBQ0YsTUFBTUw7UUFDTixNQUFNTSxPQUFPLE1BQU1aLDJEQUFXLENBQUNFLGFBQWE7UUFDNUMsT0FBT1ksS0FBS0MsS0FBSyxDQUFDSDtJQUNwQixFQUFFLE9BQU07UUFDTixPQUFPLENBQUM7SUFDVjtBQUNGO0FBRUEsb0JBQW9CO0FBQ3BCLGVBQWVJLGdCQUFnQkosSUFBUztJQUN0QyxNQUFNTjtJQUNOLE1BQU1OLDREQUFZLENBQUNFLGFBQWFZLEtBQUtJLFNBQVMsQ0FBQ04sTUFBTSxNQUFNO0FBQzdEO0FBRU8sZUFBZU8sSUFBSUMsT0FBZ0I7SUFDeEMsTUFBTSxFQUFFQyxZQUFZLEVBQUUsR0FBRyxJQUFJQyxJQUFJRixRQUFRRyxHQUFHO0lBQzVDLE1BQU1DLFNBQVNILGFBQWFJLEdBQUcsQ0FBQztJQUVoQyxJQUFJLENBQUNELFFBQVE7UUFDWCxPQUFPekIscURBQVlBLENBQUMyQixJQUFJLENBQUM7WUFBRUMsT0FBTztRQUFzQixHQUFHO1lBQUVDLFFBQVE7UUFBSTtJQUMzRTtJQUVBLE1BQU1oQixPQUFPLE1BQU1EO0lBQ25CLE9BQU9aLHFEQUFZQSxDQUFDMkIsSUFBSSxDQUFDO1FBQUVHLFFBQVFqQixJQUFJLENBQUNZLE9BQU8sSUFBSTtJQUFFO0FBQ3ZEO0FBRU8sZUFBZU0sS0FBS1YsT0FBZ0I7SUFDekMsTUFBTSxFQUFFSSxNQUFNLEVBQUVPLE1BQU0sRUFBRUMsTUFBTSxFQUFFLEdBQUcsTUFBTVosUUFBUU0sSUFBSTtJQUVyRCxJQUFJLENBQUNGLFVBQVUsQ0FBQ08sVUFBVSxDQUFDQyxRQUFRO1FBQ2pDLE9BQU9qQyxxREFBWUEsQ0FBQzJCLElBQUksQ0FBQztZQUFFQyxPQUFPO1FBQTBCLEdBQUc7WUFBRUMsUUFBUTtRQUFJO0lBQy9FO0lBRUEsTUFBTWhCLE9BQU8sTUFBTUQ7SUFDbkJDLElBQUksQ0FBQ1ksT0FBTyxHQUFHWixJQUFJLENBQUNZLE9BQU8sSUFBSTtJQUUvQixPQUFRTztRQUNOLEtBQUs7WUFDSCxJQUFJbkIsSUFBSSxDQUFDWSxPQUFPLEtBQUtTLFdBQVc7Z0JBQzlCckIsSUFBSSxDQUFDWSxPQUFPLEdBQUc7WUFDakI7WUFDQTtRQUNGLEtBQUs7WUFDSFosSUFBSSxDQUFDWSxPQUFPLElBQUlRO1lBQ2hCO1FBQ0YsS0FBSztZQUNIcEIsSUFBSSxDQUFDWSxPQUFPLEdBQUdVLEtBQUtDLEdBQUcsQ0FBQyxHQUFHdkIsSUFBSSxDQUFDWSxPQUFPLEdBQUdRO1lBQzFDO1FBQ0Y7WUFDRSxPQUFPakMscURBQVlBLENBQUMyQixJQUFJLENBQUM7Z0JBQUVDLE9BQU87WUFBaUIsR0FBRztnQkFBRUMsUUFBUTtZQUFJO0lBQ3hFO0lBRUEsTUFBTVosZ0JBQWdCSjtJQUN0QixPQUFPYixxREFBWUEsQ0FBQzJCLElBQUksQ0FBQztRQUFFRyxRQUFRakIsSUFBSSxDQUFDWSxPQUFPO0lBQUM7QUFDbEQiLCJzb3VyY2VzIjpbIi9Vc2Vycy9zdW5pZ2h0bWMvRG9jdW1lbnRzL1NvdXJjZSBDb2RlL1NjaG9vbC9QdXJraWFkYS9mcm9udGVuZC9hcHAvYXBpL3BvaW50cy9yb3V0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tICduZXh0L3NlcnZlcic7XG5pbXBvcnQgZnMgZnJvbSAnZnMvcHJvbWlzZXMnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5cbmNvbnN0IFBPSU5UU19GSUxFID0gcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksICdkYXRhJywgJ3BvaW50cy5qc29uJyk7XG5cbi8vIEVuc3VyZSBkYXRhIGRpcmVjdG9yeSBleGlzdHNcbmFzeW5jIGZ1bmN0aW9uIGVuc3VyZURhdGFEaXIoKSB7XG4gIGNvbnN0IGRpciA9IHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCAnZGF0YScpO1xuICB0cnkge1xuICAgIGF3YWl0IGZzLmFjY2VzcyhkaXIpO1xuICB9IGNhdGNoIHtcbiAgICBhd2FpdCBmcy5ta2RpcihkaXIsIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICB9XG59XG5cbi8vIFJlYWQgcG9pbnRzIGRhdGFcbmFzeW5jIGZ1bmN0aW9uIHJlYWRQb2ludHNEYXRhKCkge1xuICB0cnkge1xuICAgIGF3YWl0IGVuc3VyZURhdGFEaXIoKTtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgZnMucmVhZEZpbGUoUE9JTlRTX0ZJTEUsICd1dGYtOCcpO1xuICAgIHJldHVybiBKU09OLnBhcnNlKGRhdGEpO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4ge307XG4gIH1cbn1cblxuLy8gV3JpdGUgcG9pbnRzIGRhdGFcbmFzeW5jIGZ1bmN0aW9uIHdyaXRlUG9pbnRzRGF0YShkYXRhOiBhbnkpIHtcbiAgYXdhaXQgZW5zdXJlRGF0YURpcigpO1xuICBhd2FpdCBmcy53cml0ZUZpbGUoUE9JTlRTX0ZJTEUsIEpTT04uc3RyaW5naWZ5KGRhdGEsIG51bGwsIDIpKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEdFVChyZXF1ZXN0OiBSZXF1ZXN0KSB7XG4gIGNvbnN0IHsgc2VhcmNoUGFyYW1zIH0gPSBuZXcgVVJMKHJlcXVlc3QudXJsKTtcbiAgY29uc3QgdXNlcklkID0gc2VhcmNoUGFyYW1zLmdldCgndXNlcklkJyk7XG5cbiAgaWYgKCF1c2VySWQpIHtcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogJ1VzZXIgSUQgaXMgcmVxdWlyZWQnIH0sIHsgc3RhdHVzOiA0MDAgfSk7XG4gIH1cblxuICBjb25zdCBkYXRhID0gYXdhaXQgcmVhZFBvaW50c0RhdGEoKTtcbiAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgcG9pbnRzOiBkYXRhW3VzZXJJZF0gfHwgMCB9KTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QocmVxdWVzdDogUmVxdWVzdCkge1xuICBjb25zdCB7IHVzZXJJZCwgYWN0aW9uLCBhbW91bnQgfSA9IGF3YWl0IHJlcXVlc3QuanNvbigpO1xuXG4gIGlmICghdXNlcklkIHx8ICFhY3Rpb24gfHwgIWFtb3VudCkge1xuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiAnTWlzc2luZyByZXF1aXJlZCBmaWVsZHMnIH0sIHsgc3RhdHVzOiA0MDAgfSk7XG4gIH1cblxuICBjb25zdCBkYXRhID0gYXdhaXQgcmVhZFBvaW50c0RhdGEoKTtcbiAgZGF0YVt1c2VySWRdID0gZGF0YVt1c2VySWRdIHx8IDA7XG5cbiAgc3dpdGNoIChhY3Rpb24pIHtcbiAgICBjYXNlICdpbml0aWFsaXplJzpcbiAgICAgIGlmIChkYXRhW3VzZXJJZF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBkYXRhW3VzZXJJZF0gPSAxMDtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2FkZCc6XG4gICAgICBkYXRhW3VzZXJJZF0gKz0gYW1vdW50O1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnc3VidHJhY3QnOlxuICAgICAgZGF0YVt1c2VySWRdID0gTWF0aC5tYXgoMCwgZGF0YVt1c2VySWRdIC0gYW1vdW50KTtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogJ0ludmFsaWQgYWN0aW9uJyB9LCB7IHN0YXR1czogNDAwIH0pO1xuICB9XG5cbiAgYXdhaXQgd3JpdGVQb2ludHNEYXRhKGRhdGEpO1xuICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBwb2ludHM6IGRhdGFbdXNlcklkXSB9KTtcbn0gIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsImZzIiwicGF0aCIsIlBPSU5UU19GSUxFIiwiam9pbiIsInByb2Nlc3MiLCJjd2QiLCJlbnN1cmVEYXRhRGlyIiwiZGlyIiwiYWNjZXNzIiwibWtkaXIiLCJyZWN1cnNpdmUiLCJyZWFkUG9pbnRzRGF0YSIsImRhdGEiLCJyZWFkRmlsZSIsIkpTT04iLCJwYXJzZSIsIndyaXRlUG9pbnRzRGF0YSIsIndyaXRlRmlsZSIsInN0cmluZ2lmeSIsIkdFVCIsInJlcXVlc3QiLCJzZWFyY2hQYXJhbXMiLCJVUkwiLCJ1cmwiLCJ1c2VySWQiLCJnZXQiLCJqc29uIiwiZXJyb3IiLCJzdGF0dXMiLCJwb2ludHMiLCJQT1NUIiwiYWN0aW9uIiwiYW1vdW50IiwidW5kZWZpbmVkIiwiTWF0aCIsIm1heCJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/points/route.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fpoints%2Froute&page=%2Fapi%2Fpoints%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fpoints%2Froute.ts&appDir=%2FUsers%2Fsunightmc%2FDocuments%2FSource%20Code%2FSchool%2FPurkiada%2Ffrontend%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fsunightmc%2FDocuments%2FSource%20Code%2FSchool%2FPurkiada%2Ffrontend&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();