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
/**
 * I endeavoured to implement the new ES6 in my code
 */
//initialize the string prototype
const theString = String.prototype;

//Using ES6 repeat
theString.repeatString = function (repeatTimes) {
  /* We need to Extend String.prototype so all instances of String
   * have access to this method
   */
  /*Make sure the function parameter is a number and 
   *returns undefined if the parameter not a number that is inputed
   */
  if (typeof repeatTimes !== 'number') return;
  return this.repeat(repeatTimes);
};

console.log('Mozio'.repeatString(3));


//Using For Loop
theString.repeatString = function (repeatTimes) {
  /* We need to Extend String.prototype so all instances of String
   * have access to this method
   */
  /*Make sure the function parameter is a number and 
   *returns undefined if the parameter not a number that is inputed
   */
  if (typeof repeatTimes !== 'number') return;
  let repeatDisplay = '';
  let index = 0;

  for (index; index < repeatTimes; index += 1) {
    repeatDisplay += this; //This is the value of the string
  }
  return repeatDisplay;
}

console.log('Mozio'.repeatString(3));

/**
 * Task 2: Could you find a way to optimize the following code?
 */
// var list = document.querySelectorAll('.list li');
// function logContent() {
//     console.log(this.innerHTML);
// }
// for (var i = 0; i < list.length; i++) {
//     list[i].addEventListener('click', logContent, false);
// }

let list = document.querySelectorAll('.list');
// since `.list` class isn't reused, it returns an array of exactly one element.
const logContent = (event) => {
  /*
   * Function takes in the event object as parameter.
   * The event object holds information about the target of the event.
   * innerHTML parses content as HTML and takes longer.
   * i used textContent because it uses straight text, does not parse HTML, 
   * and it is faster
   */
  let liContent = event.target.textContent
  console.log(liContent);
  /*I used stopPropagation() to stop bubbling up to 
   *parent elements or capturing down to child elements.
   *it prevents propagation of the same event from being called.
   */
  event.stopPropagation();
}
/**
 * Bind the event listener to the parent element `.list`
 *
 * Given the event flow in HTML, the event WILL pass through the target parent AT LEAST once
 * Twice if the bubbling phase is not cancelled.
 * For this particular scenario, here I used `useCapture` parameter
 * so that the listener gets triggered during the capturing phase so i set it to `true`,
 * but the scenario is so simple that the handler will work in either capturing or bubbling phase.
 */
list[0].addEventListener('click', logContent, true);


/**
 * Task 3: Inspect the output in the console from clicking an
 * item from ".list2", each index is the same
 * Explain why, and also fix the problem to log the correct index
 */
// var list2 = document.querySelectorAll('.list2 li');
// for (var i = 0; i < list2.length; i++) {
//     list2[i].addEventListener('click', function () {
//     	console.log('My index:', i);
//     }, false);
// }

/**  
TASK 3 EXPLANATION:
*
* In the given code,the event handler function is in the inner scope of a parent scope
* Therefore, it has access to variables defined outside of its scope (`i` in this case).
* The problem is that `i` is defined in the outer scope and continues to live after the event handler is 
* executed, and therefore it is modified.
* When the event handler is called, it searches the outer scope for `i` and uses it, whatever the value of `i`
* was at the moment, and given that `i` was the counter for the loop, it will hold the value at the
* end of the loop which is 5.
*
* The way to prevent this by using an IIFE(Immediately Invoked Function Expression) so that the value of `i` gets captured in a closure.
*/


var list2 = document.querySelectorAll('.list2 li');
for (var i = 0; i < list2.length; i++) {
  (function (i) {
    list2[i].addEventListener('click', function () {
      console.log('My index:', i);
    }, false);
  }(i));
}

/**
 * Task 4: Explain why the logs happen in the following order:
 * one, three, two
 */
(function () {
  console.log('one');
  setTimeout(function () {
    console.log('two');
  }, 0);
  console.log('three');
})();

/**
 * TASK 4 EXPLANATION
 * Since a function executes from top to bottom once called therefore
 * this function is meant execute the first command down to the last
 * 
 * But in this case the setTimeout() method causes console.log('two') to execute
 * after some 0 milliseconds therefore causing all other command to execute before it
 * 
 * setTimeout is part of what are called `browser APIs`.
 * Those are services that JS can ask of the browser and gets the results later.
 * The browser handles those web api's calls using the event loop.
 *
 * This event loop is a stack that tracks the order of this calls, and performs them in an async fashion.
 * When calling a `setTimeout` with 0 delay, we are basically saying to the event loop:
 * Place this at your top, to be executed immediatelly after the main script runs.
 * 
 * For this particular code, there are two "main" instructions and one setTimeout call.
 * Step 1: Prints "one"
 * Step 2: Adds a timeout to the event loop, to be executed with a delay of 0, 
 * but given the nature of the event loop, this will not be executed until the "main script" is done
 * Step 3: prints "three"
 * Step 4: "main" script is done, event loop can execute the calls in its stack
 * Step 5: timeout is executed. Prints "two"
 */



/**
 * Task 5: Explain how "this" works in this particular scenario
 * (how iPad is logged, followed by iPhone)
 */

/**
 * TASK 5 EXPLANATION
 * By default the execution context for an execution is global which means 
 * that if a code is being executed as part of a simple function call then “this”
 *  refers to global object. “window” object is the global object in case of browser
 *  and in Node.JS environment, a special object “global” will be the value of “this”.
 * 
 * So, what's happening?
 * the first call to `obj.prop.getProductName()` is called directly on the object where it is
 * defined, so the value of `this` is the object itself:
 * When the method tries to access `product` it first looks into the current scope (the object)
 * to see if it finds a property with that name and uses it.
 * In this case, the object `obj` does have a property `product` with value "ipad".
 * Thus, the `getProductName` uses that property and its value, and we end up with "iPad".
 *
 * Now, when we declare the variable `test` what we are doing is creating a reference
 * to the function handled by `getProductName`.
 * (notice that `getProductName` is a key, the actual function is anonymous)
 * The function is the same, but:
 * 1. Since this script is not defined in a closure, 
 *    `var test` will be defined in the default global scope: `window`.
 * 2. `var product = 'iPhone'` is equally defined outside any closure, so it too will 
 *    end up in the `window` scope.
 * 3. The call to test is also outside of any closure. 
 *    So its context will default to the global scope.
 * So, when we use the handler `test` to call the anonymous function, it will execute
 * in the global scope, and thus the value of `this` will be the `window` object.
 * When accessing the property `product`, it will look for it in the `window` object, and
 * since we already showed that `var product = "iPhone"` ends up defined in the `window` object,
 * the value "iPhone" will be the one used.
 */
var product = 'iPhone';
var obj = {
  product: 'iMac',
  prop: {
    product: 'iPad',
    getProductName: function () {
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
const getFileExtension = (file) => {
  if (typeof file !== 'string') return false; //Safety check
  let fileExtIndex = file.indexOf('.'); //Check the position of '.' is in the filename
  let fileExtension;
  if (fileExtIndex !== -1) {
    /* substring() Returns the substring at the specified location within a String object 
     * here its the substring after '.' position in the filename.
     */
    fileExtension = file.substring(fileExtIndex); //use fileExtIndex of +1 if '.' isn't desired in the output
  } else {
    fileExtension = false;
  }
  return fileExtension;
}
console.log(getFileExtension('mozio.png'));



/**
 * Task 7: Return the longest String in the Array and
 * in all nested arrays
 */
const longestString = (i) => {
  /**
   * Check if the function arguement is an array
   */
  if (!Array.isArray(i)) return;

  let primLongestArrElementIndex;
  let secLongestArrElementIndex;
  let tertLongestArrElementIndex;
  let primLongestElement;
  let secLongestElement;
  let tertLongestElement;
  let primArrElement;
  let secArrElement;
  let tertArrElement;
  let primLongestArrElementLength = 0;
  let secLongestArrElementLength = 0;
  let tertLongestArrElementLength = 0;
  /**
   * Loop through the input array
   */
  for (index = 0; index < i.length; ++index) {
    primArrElement = i[index];
    /**
     * Perform these if the array element is a @string
     */
    if (typeof primArrElement === 'string') {
      //  console.log(primArrElement);
      if (primArrElement.length > primLongestArrElementLength) {
        primLongestArrElementLength = primArrElement.length;
        // console.log(primLongestArrElementLength);
        primLongestArrElementIndex = index;



      }

    }
    /**
     * Perform these if the array element is an @array
     */
    if (Array.isArray(primArrElement)) {
      /**
     * Loop through the nested array 
     */
      for (j = 0; j < primArrElement.length; ++j) {
        secArrElement = primArrElement[j];
        //  console.log(secArrElement);
        /**
     * Perform these if the array element is a @string
     */
        if (typeof secArrElement === 'string') {
          // console.log(secArrElement);
          if (secArrElement.length > secLongestArrElementLength) {
            secLongestArrElementLength = secArrElement.length;
            // console.log(secLongestArrElementLength);
            secLongestArrElementIndex = j;
          }


        }
        /**
     * Perform these if the array element is a @array
     */
        if (Array.isArray(secArrElement)) {

          // loop through the subarray
          for (k = 0; k < secArrElement.length; ++k) {
            tertArrElement = secArrElement[k];
            // console.log(tertArrElement);
            if (typeof tertArrElement === 'string') {
              // console.log(tertArrElement);
              if (tertArrElement.length > tertLongestArrElementLength) {
                tertLongestArrElementLength = tertArrElement.length;
                // console.log(tertLongestArrElementLength);
                tertLongestArrElementIndex = k;

              }


            }
          }
        }
      }
    }

  }

  // The Longest Element in the main array
  primLongestElement = i[primLongestArrElementIndex]
  // console.log(primLongestElement);

  // The longest element in the nested array
  secLongestElement = primArrElement[secLongestArrElementIndex];
  // console.log(secLongestElement)

  // The longest element in the sub array
  tertLongestElement = secArrElement[tertLongestArrElementIndex];
  // console.log(tertLongestElement)

  const longestStrArr = [
    primLongestElement,
    secLongestElement,
    tertLongestElement
  ]

  // Now Find the Longest string using ES6 reduce
  const finalLongestString = longestStrArr.reduce((previous, next) => {
    return previous.length > next.length ? previous : next;
  });

  return ` The longest string is ${finalLongestString}`;
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

const validateForm = (event) => {
  let isValid = true; //assume good intentions...
  let inputs = this.elements;
  let index;
  let length;
  for (index = 0, length = inputs.length; index < length; index += 1){
    let element = inputs[index];
    if (element.required && element.value === ''){
      isValid = isValid && false;
    }
    if(element.type === 'email'){
      isValid = isValid && validateEmail(element.value); 
    } else if (element.type === 'text'){
      //Do something with text inputs...
    }
  }
  if (!isValid){
    event.preventDefault();
    event.stopPropagation();
    alert("There are errors on the form and therefore cannot be submitted");
  } else {
    /**
     * Our form doesn't have an `action` attribute in its markup
     * which is the one that indicates where to submit the form
     * However, we have tied this function on the `submit` event
     * and have direct access to the form;
     * we could access the form here and set its action, along with the
     * appropriate HTTP method.
     * If nothing calls `event.preventDefault()` on this block, the form will be submited.
     */
    
  }
}

const form = document.querySelectorAll('[name=myForm]');
form[0].addEventListener('submit', validateForm, false);




/**
 * Task 9: Provide some links to your previous work. It could be anything,
 * from your library to the website you made the layout for. For each link
 * please describe what you did there.
 */

// <https://brillhealthweb.surge.sh/>: <While working at Sprinble Developed the Front End for Brillhealth website,i Converted UI/UX Mockup to Interactive Web Pages HTML, CSS, JavaScript, JQuery, Bootstrap.>

// <https://natoursui.surge.sh/>: <Developed Front end prototype for an organization that engages in tourism services, did that while updating my skills in HTML, CSS and SASS>

// <https://furnitureweb.surge.sh/>: <While working at Sprinble i Developed Front End prototype for an organization that engages in Furniture services, i converted UI/UX mockups to interactive web pages using HTML, CSS, JavaScript, JQuery, Bootstrap >

// <https://constructionweb.surge.sh/>: <While working at Sprinble i Developed Front End prototype for an organization that engages in Construction services, i converted UI/UX mockups to interactive web pages using HTML, CSS, JavaScript, JQuery, Bootstrap>

// <https://travelagencyweb.surge.sh/>: <While working at Sprinble i Developed Front End prototype for an organization that engages in Construction services, i converted UI/UX mockups to interactive web pages using HTML, CSS, JavaScript, JQuery, Bootstrap>

// <https://searcengine.herokuapp.com/>: <While improving my react skills, Developed a react app with search functionality, i fetched an api from https://jsonplaceholder.typicode.com/ and implemented the search functionality >

// <http://reactreduxnote.herokuapp.com/>: <While improving my react and redux skills, Developed a react app and used redux for state management, i created a simple note app with CRUD functionality, i used tachyons for styling>

// <https://tizetiui.surge.sh/home.html>: <Developed a user history Front End for Tizeti Network limited, by concerting a UI/UX Mockup to interactive web page using HTML, CSS, JavaScript, BootStrap>

// <http://bit.ly/myportfolio_web>: <Developed my personal portfolio website, i will still improve on it soon, built it using HTML, CSS, JavaScript, Bootstrap>

// <https://ecommerce-web.surge.sh/productpage.html>: <While working at Sprinble i Developed Front End prototype for an ecommerce website product page, i converted UI/UX Mockup to interactive web pages using HTML, CSS, JavaScript, JQuery, Bootstrap>

// <https://ecommerce-web.surge.sh/salespage.html>: <While working at Sprinble i Developed Front End prototype for an ecommerce website sales page, i converted UI/UX Mockup to interactive web pages using HTML, CSS, JavaScript, JQuery, Bootstrap>

// <https://ecommerce-web.surge.sh/productpage1.html>: <While working at Sprinble i Developed Front End prototype for an ecommerce website product page i converted UI/UX Mockup to interactive web pages using HTML, CSS, JavaScript, JQuery, Bootstrap>


