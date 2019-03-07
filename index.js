/***********************************************\
 * Mozio JavaScript challenge
 * Browser support is irrelevant here, but any comments on specific
 * methods you use is a plus to show deeper understanding of the language
\***********************************************/

/**
 * Task 1: Write a function that repeats the String
 * with the following output:
 * 'Mozio'.repeatify(3); // 'MozioMozioMozio';
 */

const theString = String.prototype;
theString.repeatString = function (repeatTimes){
  /* We need to Extend String.prototype so all instances of String
   * have access to this method
   */
    if (typeof repeatTimes !== 'number') return;
    //Using ES6 repeat
    return this.repeat(repeatTimes);
};

console.log('Mozio'.repeatString(3));

theString.repeatString = function (repeatTimes) {
  /* We need to Extend String.prototype so all instances of String
   * have access to this method
   */
  if (typeof repeatTimes !== 'number') return
  let repeatDisplay = '';
  let index = 0;
  //Using For Loop
  for(index; index < repeatTimes; index += 1) {
    repeatDisplay += this; //This is the value of the string
  }
  return repeatDisplay;
}

console.log('Mozio'.repeatString(3));

/**
 * Task 2: Could you find a way to optimize the following code?
 */
var list = document.querySelectorAll('.list li');
function logContent() {
    console.log(this.innerHTML);
}
for (var i = 0; i < list.length; i++) {
    list[i].addEventListener('click', logContent, false);
}

/**
 * Task 3: Inspect the output in the console from clicking an
 * item from ".list2", each index is the same
 * Explain why, and also fix the problem to log the correct index
 */
var list2 = document.querySelectorAll('.list2 li');
for (var i = 0; i < list2.length; i++) {
    list2[i].addEventListener('click', function () {
    	console.log('My index:', i);
    }, false);
}

/**
 * Task 4: Explain why the logs happen in the following order:
 * one, three, two
 */
(function () {
    console.log('one');
    setTimeout(function() {
      console.log('two');
    }, 0);
    console.log('three');
})();

/**
 * Task 5: Explain how "this" works in this particular scenario
 * (how iPad is logged, followed by iPhone)
 */
var product = 'iPhone';
var obj = {
   product: 'iMac',
   prop: {
      product: 'iPad',
      getProductName: function() {
         return this.product;
      }
   }
};
console.log(obj.prop.getProductName());
var test = obj.prop.getProductName;
console.log(test());

/**
 * Task 6: Return the file extension or "false" if no extension. Please
 * explain how would you implement unit test for this function. Show
 * all the test cases.
 */
function getFileExtension(file) {

}
console.log(getFileExtension('mozio.png'));

/**
 * Task 7: Return the longest String in the Array and
 * in all nested arrays
 */
function longestString(i) {

}
var longest = longestString([
	'coca-cola',
  'pepsi',
  'lemonade',
  'red bull',
  ['im the longest string', ['vodka']]
]);
console.log(longest);

/**
 * Task 8: Write a simple validation script for the above form
 * - If the required fields are not filled out, do not submit the form
 * - If the email is invalid, do not submit the form
 * - To validate the email, please call the validateEmail function
 * - The form should be able to have more fields added to it and
     still work, without changing the JavaScript
   - The form doesn't need to post to a specific URL but please comment
     inside the code to demonstrate where this would happen
 */

function validateEmail(str) {
    var regexp = /[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*/;
	return regexp.test(str);
}

/**
 * Task 9: Provide some links to your previous work. It could be anything,
 * from your library to the website you made the layout for. For each link
 * please describe what you did there.
 */

 // <Link 1>: <description>
 // <Link 2>: <description>
