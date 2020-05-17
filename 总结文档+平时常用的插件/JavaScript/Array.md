# [Array](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from)

## 数据去重
```javascript
    function combine() {
      let arr = [].concat.apply([], arguments);  //没有去重复的新数组 
      return Array.from(new Set(arr)); 
    }

    var m = [1, 2, 2], n = [2, 3, 3];
    console.log(combine(m, n));    
```

## [Array.from](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from)
  方法从一个类似数组或可迭代对象创建一个新的，浅拷贝的数组实例。

  ### **语法**

```javascript
 Array.from(arrayLike[, mapFn[, thisArg]])
```
  ### 参数
   #### **arrayLike**   
   想要转换成数组的伪数组对象或可迭代对象。  

   #### **mapFn 可选**
   如果指定了该参数，新数组中的每个元素会执行该回调函数。
   #### **thisArg 可选**
   可选参数，执行回调函数 mapFn 时 this 对象。
   #### **返回值**
  一个新的数组实例。

  ### 示例
```javascript
  //1. 从 String 生成数组
  Array.from('foo'); 
  // [ "f", "o", "o" ]

  //2. 从 Set 生成数组
  const set = new Set(['foo', 'bar', 'baz', 'foo']);
  Array.from(set);
  // [ "foo", "bar", "baz" ]

  //3. 从 Map 生成数组
  const map = new Map([[1, 2], [2, 4], [4, 8]]);
  Array.from(map);
  // [[1, 2], [2, 4], [4, 8]]

  const mapper = new Map([['1', 'a'], ['2', 'b']]);
  Array.from(mapper.values());
  // ['a', 'b'];

  Array.from(mapper.keys());
  // ['1', '2'];

  //4. 从类数组对象（arguments）生成数组
  function f() {
    return Array.from(arguments);
  }

  f(1, 2, 3);

  // [ 1, 2, 3 ]
```
### [Array.isArray()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray)

  Array.isArray() 用于确定传递的值是否是一个 Array。

  ### 示例
  ```javascript
    Array.isArray([1, 2, 3]);  
    // true
    Array.isArray({foo: 123}); 
    // false
    Array.isArray("foobar");   
    // false
    Array.isArray(undefined);  
    // false
  ```


## [Array.of()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/of)

  ### 语法
  > Array.of(element0[, element1[, ...[, elementN]]])

  ### 参数
  elementN  
  任意个参数，将按顺序成为返回数组中的元素。

  ### 返回值
  新的 Array 实例。

  ### 示例
  ```javascript
    Array.of(7);       // [7] 
    Array.of(1, 2, 3); // [1, 2, 3]

    Array(7);          // [ , , , , , , ]
    Array(1, 2, 3);    // [1, 2, 3]
  ```

## [Array.concat()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)

  concat() 方法用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。

  ### 示例
  ```javascript
    var num1 = [1, 2, 3],
        num2 = [4, 5, 6],
        num3 = [7, 8, 9];

    var nums = num1.concat(num2, num3);

    console.log(nums); 
    // results in [1, 2, 3, 4, 5, 6, 7, 8, 9]
  ```

## [Array.copyWithin()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/copyWithin)
  copyWithin() 方法浅复制数组的一部分到同一数组中的另一个位置，并返回它，不会改变原数组的长度。

  ### 参考资料
  https://blog.csdn.net/qq_30100043/article/details/53219365



## [Array.entries()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/entries)
entries() 方法返回一个新的Array Iterator对象，该对象包含数组中每个索引的键/值对。
  ### 示例
  ```javascript
    const array1 = ['a', 'b', 'c'];

    const iterator1 = array1.entries();

    console.log(iterator1.next().value);
    // expected output: Array [0, "a"]

    console.log(iterator1.next().value);
    // expected output: Array [1, "b"]

    console.log(iterator1.next().value);
    // expected output: Array [2, "c"]
  ```

## [Array.every()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/every)
every() 方法测试一个数组内的所有元素是否都能通过某个指定函数的测试。它返回一个布尔值。

  ### 示例
  ```javascript

    const isBelowThreshold = (currentValue) => currentValue < 40;

    const array1 = [1, 30, 39, 29, 10, 13];

    console.log(array1.every(isBelowThreshold));
    // expected output: true

  ```
## [ Array.fill()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/fill)
fill() 方法用一个固定值填充一个数组中从起始索引到终止索引内的全部元素。不包括终止索引。

  ###示例
  ```javascript
    const array1 = [1, 2, 3, 4];

    // fill with 0 from position 2 until position 4
    console.log(array1.fill(0, 2, 4));
    // expected output: [1, 2, 0, 0]

    // fill with 5 from position 1
    console.log(array1.fill(5, 1));
    // expected output: [1, 5, 5, 5]

    console.log(array1.fill(6));
    // expected output: [6, 6, 6, 6]
  ```

## [Array.filter()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

  ### 语法
> var newArray = arr.filter(callback(element[, index[, array]])[, thisArg])

  ### 参数
  **callback**  
  用来测试数组的每个元素的函数。返回 true 表示该元素通过测试，保留该元素，false 则不保留。它接受以下三个参数：  

  **element**  
    数组中当前正在处理的元素。  

  **index可选**
    正在处理的元素在数组中的索引。 

  **array可选**
    调用了 filter 的数组本身。

  **thisArg可选**
    执行 callback 时，用于 this 的值。
  ### 返回值
  一个新的、由通过测试的元素组成的数组，如果没有任何数组元素通过测试，则返回空数组。

  ### 示例
  筛选排除所有较小的值
下例使用 filter 创建了一个新数组，该数组的元素由原数组中值大于 10 的元素组成。
>
```javascript
  function isBigEnough(element) {
    return element >= 10;
  }
  var filtered = [12, 5, 8, 130, 44].filter(isBigEnough);
  // filtered is [12, 130, 44] 
```

## [Array.find()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/find)

  find() 方法返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined。

  ### 返回值
  数组中第一个满足所提供测试函数的元素的值，否则返回 undefined。

  ### 示例
```javascript
  var inventory = [
      {name: 'apples', quantity: 2},
      {name: 'bananas', quantity: 0},
      {name: 'cherries', quantity: 5}
  ];

  function findCherries(fruit) { 
      return fruit.name === 'cherries';
  }

  console.log(inventory.find(findCherries)); // { name: 'cherries', quantity: 5 }
```

## [Array.findIndex()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)

  findIndex()方法返回数组中满足提供的测试函数的第一个元素的索引。否则返回-1。

  ### 示例

  查找数组大于13的值，并返回其下标值
  ```javascript
    const array1 = [5, 12, 8, 130, 44];

    const isLargeNumber = (element) => element > 13;

    console.log(array1.findIndex(isLargeNumber));
    // expected output: 3

  ```

##  [Array.flat()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)

  flat() 方法会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。

  ### 语法
> var newArray = arr.flat([depth])

  ### 参数
 **depth 可选**  
  指定要提取嵌套数组的结构深度，默认值为 1。

  ### 返回值
  一个包含将数组与子数组中所有元素的新数组。

  ### 示例
  1. 扁平化嵌套数组
```javascript
    var arr1 = [1, 2, [3, 4]];
    arr1.flat(); 
    // [1, 2, 3, 4]

    var arr2 = [1, 2, [3, 4, [5, 6]]];
    arr2.flat();
    // [1, 2, 3, 4, [5, 6]]

    var arr3 = [1, 2, [3, 4, [5, 6]]];
    arr3.flat(2);
    // [1, 2, 3, 4, 5, 6]

    //使用 Infinity，可展开任意深度的嵌套数组
    var arr4 = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]];
    arr4.flat(Infinity);
    // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

 2. 扁平化与数组空项 - flat() 方法会移除数组中的空项:
```javascript
   var arr4 = [1, 2, , 4, 5];
   arr4.flat();
   // [1, 2, 4, 5]
```

## [Array.floatMap()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap)

  ### 示例
  ```javascript
    let arr1 = ["it's Sunny in", "", "California"];

    arr1.map(x => x.split(" "));
    // [["it's","Sunny","in"],[""],["California"]]

    arr1.flatMap(x => x.split(" "));
    // ["it's","Sunny","in", "", "California"]
  ```

## [Array.includes()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)

includes() 方法用来判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 true，否则返回false。

### 示例
  ```javascript
    const array1 = [1, 2, 3];

    console.log(array1.includes(2));
    // expected output: true

    const pets = ['cat', 'dog', 'bat'];

    console.log(pets.includes('cat'));
    // expected output: true

    console.log(pets.includes('at'));
    // expected output: false

  ```

## [Array.pop()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/pop)


## Array.repeat()
无限重复同一个值。
  ### 示例
  