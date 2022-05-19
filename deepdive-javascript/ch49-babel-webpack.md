# DeepDiveJS # 49 Babel과 Webpack을 이용한 ES+/ES.NEXT 개발환경 구축

- 매년 새롭게 도입되는 ES6 이상의 버전과 제안 단계에 있는 사양에 대한 브라우저에 지원율은 제각기 다르다.
- 따라서 최신 ECMAScript 사양을 사용하여 프로젝트를 진행하기 위해서는 브라우저 지원 범위에 관계 없이 동작시키기 위한 개발 환경을 구축해야 한다.
- 대부분의 프로젝트가 모듈을 사용하므로 모듈 로더도 필요하다.
- 트랜스파일러인 `Bable`과 모듈 번들러인 `Webpack` 을 이용하여 ES6+/ES.NEXT 개발 환경을 구축해보자.

## Babel 설치

```
# 프로젝트 폴더 생성
$ mkdir esnext-project && cd esnext-project
# package.json 생성
$ npm init -y
# babel-core, babel-cli 설치
$ npm i -D @babel/core @babel/cli
```

- Babel 을 사용하려면 `@babel/preset-env` 를 설치해야함
- `@babel/preset-env` 는 함께 사용되어야 하는 Babel 플러그인을 모아둔 것으로 Babel 프리셋이라고 부른다.
- @babel/preset-env 는 필요한 플러그인들을 프로젝트 지원 환경에 맞춰 동적으로 결정해줌
- 루트 폴더에 babel.config.json 설정 파일을 생성하고 다음과 같이 작성
- 지금 설치한 @babel/preset-env 을 사용하겠다는 의미다.

```json
{
	"presets": ["@babel/preset-env"]
}
```

### 트랜스파일링

- Babel 을 사용하여 ES6+/ES.NEXT 최신 사양의 소스코드를 ES5 사양의 소스코드로 트랜스파일링 해보자.
- 매번 babel/cli 명령어를 사용하는 건 번거로우므로 npm scripts 에 Babel CLI 명렁어를 등록하여 사용한다.

```json
{
	"name": "babel-webpack-test",
	"scripts": {
		"build": "babel src/js -w -d dist/js"
	},
	"devDependencies": {
		"@babel/cli": "^7.17.10",
		"@babel/core": "^7.17.12",
		"@babel/preset-env": "^7.17.12"
	}
}
```

- build script 는 src/js 폴더 (타깃 폴더)에 있는 모든 자바스크립트 파일들을 트랜스파일링한 후, 그 결과물을 dist/js 폴더에 저장한다는 의미다.
- `-w` : 타깃 폴더에 잇는 모든 자바스크립트 파일들의 변경을 감지하여 자동으로 트랜스파일링 (--watch 의 축약형)
- `-d` : 트랜스파일링된 결과물이 저장될 폴더를 지정 / 폴더가 없는 경우 자동 생성 (--out-dir 옵션의 축약형)

- src/js 폴더에 lib.js 파일과 main.js 파일을 생성하여 바벨 트랜스파일링이 제대로 작동하는지 확인한다.

```js
// lib.js

export const pi = Math.PI; // ES6 모듈

export function power(x, y) {
	return x ** y; // ES7 : 지수 연산자
}

// ES6 클래스
export class Foo {
	#private = 10; // stage 3 : 클래스 필드 정의 제안
	foo() {
		// stage 4 : 객체 Rest/Spread 프로퍼티 제안
		const { a, b, ...x } = { ...{ a: 1, b: 2 }, c: 3, d: 4 };
	}
	bar() {
		return this.#private;
	}
}

// main.js

import { pi, power, Foo } from "./lib";

console.log(pi);
console.log(power(pi, pi));

const f = new Foo();
console.log(f.foo());
console.log(f.bar());

// npm run build                                                                                                 ─╯

// > build
// > babel src/js -w -d dist/js

// Successfully compiled 2 files with Babel (190ms).
```

### 브라우저에서 모듈 로딩 테스트

- 위 예제의 모듈 기능은 Node.js 환경에서 동작한 것이고 Babel이 모듈을 트랜스파일링한 것도 Node.js 가 기본 지원하는 CommonJS 방식의 모듈 로딩 시스템에 따른 것이다.
- 브라우저는 CommonJS 방식의 require 함수를 지원하지 않으므로 위에서 트랜스파일링된 결과를 그대로 브라우저에서 실행하면 에러가 발생한다.

```
Uncaught ReferenceError: exports is not defined
    at lib.js:3:23
main.js:3 Uncaught ReferenceError: require is not defined
    at main.js:3:12
```

- ESM 을 사용하도록 Babel 을 설정할 수도 있으나 ESM을 사용하는 것은 문제가 있다.
- Webpack 을 통해 이러한 문제를 해결한다.

## 49.2 Webpack

- Webpack 은 의존 관계에 잇는 자바스크립트, CSS, 이미지 등의 리소스들을 하나(또는 여러 개)의 파일로 번들링하는 모듈 번들러다.
- Webpack 을 사용하면 의존 모듈이 하나의 파일로 번들링되므로 별도의 모듈 로더가 필요 없다.
- 여러 개의 자바스크립트 파일을 하나로 번들링하므로 HTML 파일에서 script 태그로 여러 개의 자바스크립트 파일을 로드해야 하는 번거로움도 사라진다.

### Webpack 설치

- Webpack 설치
  - `npm i -D webpack webpack-cli `
- Webpack이 모듈을 번들링할 때 Babel을 사용하여 ES6+/ES.NEXT 사양의 소스코드를 ES5 사양의 소스코드로 트랜스파일링하도록 babel-loader 설치
  - `npm i -D babel-loader`
- npm scripts 를 변경하여 Babel 대신 Webpack을 실행하도록 하자
  - `webpack -w`
- webpack.config.js 설정 파일 작성하기
  - webpack.config.js 는 Webpack이 실행될 때 참조하는 설정 파일이다.

```js
const path = require("path");

module.exports = {
	// entry file
	entry: "./src/js/main.js",
	// 번들링된 js 파일의 이름과 저장될 경로를 지정
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "js/bundle.js",
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				include: [path.resolve(__dirname, "src/js")],
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"],
					},
				},
			},
		],
	},
	devtool: "source-map",
	mode: "development",
};
```

- 결과

```
╰─ npm run build                                                                                                 ─╯

> build
> webpack -w

asset js/bundle.js 7.89 KiB [emitted] (name: main) 1 related asset
runtime modules 670 bytes 3 modules
cacheable modules 4.52 KiB
  ./src/js/main.js 147 bytes [built] [code generated]
  ./src/js/lib.js 4.38 KiB [built] [code generated]
webpack 5.72.1 compiled successfully in 297 ms
```

- 이제 브라우저에서 모든 코드들이 정상 작동하는 것을 확인할 수 있다.

```html
<script src="dist/js/bundle.js"></script>
```

### babel-polyfill

- Babel 을 사용하여 최신 사양의 소스코드를 트랜스파일링해도 브라우저가 지원하지 않는 코드가 남아 있을 수 있음
- ES6에서 추가된 Promise, Object.assign, Array.from 등은 ES5 사양으로 트랜스스파일링해도 ES5 사양에 대체할 기능이 없기 때문에 트랜스파일링되지 못한다.

```js
// polyfill이 필요한 코드
console.log(
	new Promise((resolve, reject) => {
		setTimeout(() => resolve(1), 100);
	})
);

// polyfill이 필요한 코드
console.log(Object.assign({}, { x: 1 }, { y: 2 }));

// polyfill이 필요한 코드
console.log(Array.from([1, 2, 3], (v) => v + v));
```

- 해당 파일들은 webpack bundle 파일에 트랜스파일링되지 못하고 그대로 출력되고 구형 브라우저에서는 실행되지 않을 수 있다.
- 따라서 @babel/polyfill 을 설치해야한다.
- `npm install @babel/polyfill`
- @babel/polyfill 은 개발 환경에서만 사용하는 것이 아니라 실제 운영 환경에서도 사용해야 하기 때문에 dependencies에 설치한다.
- import "@babel/polyfill" 로 사용할 수도 있지만
- Webpack 을 사용하는 경우에는 webpack.config.js 파일의 entry 배열에 폴리필을 추가한다.

```js
module.exports = {
	// entry file
	entry: ["@babel/polyfill", "./src/js/main.js"],
};
```

- dist/js/bundle.js 를 확인해보면 폴리필이 추가된 것을 확인할 수 있다.

```js
__webpack_require__(/*! core-js/es6 */ "./node_modules/core-js/es6/index.js");

__webpack_require__(
	/*! core-js/fn/array/includes */ "./node_modules/core-js/fn/array/includes.js"
);

__webpack_require__(
	/*! core-js/fn/array/flat-map */ "./node_modules/core-js/fn/array/flat-map.js"
);

__webpack_require__(
	/*! core-js/fn/string/pad-start */ "./node_modules/core-js/fn/string/pad-start.js"
);

__webpack_require__(
	/*! core-js/fn/string/pad-end */ "./node_modules/core-js/fn/string/pad-end.js"
);

__webpack_require__(
	/*! core-js/fn/string/trim-start */ "./node_modules/core-js/fn/string/trim-start.js"
);

__webpack_require__(
	/*! core-js/fn/string/trim-end */ "./node_modules/core-js/fn/string/trim-end.js"
);

__webpack_require__(
	/*! core-js/fn/symbol/async-iterator */ "./node_modules/core-js/fn/symbol/async-iterator.js"
);

__webpack_require__(
	/*! core-js/fn/object/get-own-property-descriptors */ "./node_modules/core-js/fn/object/get-own-property-descriptors.js"
);

__webpack_require__(
	/*! core-js/fn/object/values */ "./node_modules/core-js/fn/object/values.js"
);

__webpack_require__(
	/*! core-js/fn/object/entries */ "./node_modules/core-js/fn/object/entries.js"
);

__webpack_require__(
	/*! core-js/fn/promise/finally */ "./node_modules/core-js/fn/promise/finally.js"
);

__webpack_require__(/*! core-js/web */ "./node_modules/core-js/web/index.js");

__webpack_require__(
	/*! regenerator-runtime/runtime */ "./node_modules/regenerator-runtime/runtime.js"
);
```

_220519_
