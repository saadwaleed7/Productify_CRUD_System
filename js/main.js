var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productCategoryInput = document.getElementById("productCategory");
var productDesctiptionInput = document.getElementById("productDesctiption");
var mainBtn = document.getElementById("btn");
var productsContainer = [];
var getIndexProduct;

if (localStorage.getItem("ourProducts") != null) {
  productsContainer = JSON.parse(localStorage.getItem("ourProducts"));
  dispalyProducts();
}



/*

function addProduct()
{
    var product = {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        desc: productDesctiptionInput.value,
    }
    productsContainer.push(product)
    localStorage.setItem("ourProducts", JSON.stringify(productsContainer));
    dispalyProducts();
    clearForm();
}
*/


function addProduct() 
{
  if (validationProductName() == true && validationProductPrice() == true && validationProductCategory() == true) {
    
    if (mainBtn.innerHTML == "Add Product") 
    {
       var product = {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        desc: productDesctiptionInput.value,
      };

      productsContainer.push(product);
    }
    else {
      
      mainBtn.innerHTML = "Add Product"; // رجع نص الزرار
      updateBtn(getIndexProduct);      
    } 
    localStorage.setItem("ourProducts", JSON.stringify(productsContainer));
    dispalyProducts();
    clearForm(); // المسح سيخفي الرسائل أيضاً
  }
}



function clearForm() {
  productNameInput.value = "";
  productPriceInput.value = "";
  productCategoryInput.value = "";
  productDesctiptionInput.value = "";
  hideErrors();
  mainBtn.disabled = true; // إعادة قفل الزرار
}


function hideErrors() {
    document.getElementById("errorInputNameId").classList.add("d-none");
    document.getElementById("errorInputPriceId").classList.add("d-none");
    document.getElementById("errorInputCategId").classList.add("d-none");
}




function dispalyProducts() {
  var cartoona = ``;

  for (var i = 0; i < productsContainer.length; i++) {
    cartoona += `<tr>
        <td>${i}</td>
        <td>${productsContainer[i].name}</td>
        <td>${productsContainer[i].price}</td>
        <td>${productsContainer[i].category}</td>
        <td>${productsContainer[i].desc}</td>
        <td><button onclick= "updateProduct(${i})" class="btn btn-outline-info">Update</button></td>
        <td><button onclick= "deletProduct(${i})" class="btn btn-outline-danger">Delete</button></td>
        </tr>`;
  }
  document.getElementById("tableBody").innerHTML = cartoona;
}


function deletProduct(index) {
  productsContainer.splice(index, 1);
  localStorage.setItem("ourProducts", JSON.stringify(productsContainer));
  dispalyProducts();
}


function updateProduct(index) {
  productNameInput.value = productsContainer[index].name;
  productPriceInput.value = productsContainer[index].price;
  productCategoryInput.value = productsContainer[index].category;
  productDesctiptionInput.value = productsContainer[index].desc;

  mainBtn.innerHTML = "Ubdate Product";
  mainBtn.disabled = false; // فتح الزرار عند التعديل
  getIndexProduct = index;
}


function updateBtn(index) {
    productsContainer[index].name = productNameInput.value;
    productsContainer[index].price = productPriceInput.value;
    productsContainer[index].category = productCategoryInput.value;
    productsContainer[index].desc = productDesctiptionInput.value;
}


function searchProduct(term) {
  var cartoona = ``;
  for (var i = 0; i < productsContainer.length; i++) {
    if (
      productsContainer[i].name.toLowerCase().includes(term.toLowerCase()) ==
      true
    ) {
      cartoona += `<tr>
            <td>${i}</td>
            <td>${productsContainer[i].name}</td>
            <td>${productsContainer[i].price}</td>
            <td>${productsContainer[i].category}</td>
            <td>${productsContainer[i].desc}</td>
            <td><button onclick= "updateProduct(${i})" class="btn btn-outline-info">Update</button></td>
            <td><button onclick= "deletProduct(${i})" class="btn btn-outline-danger">Delete</button></td>
            </tr>`;
    }
  }
  document.getElementById("tableBody").innerHTML = cartoona;
}

function test() {
 
  console.log("Update");
}



function validationProductName() {
  var regex = /^[A-Z][a-z]{1,6}$/;
  if (regex.test(productNameInput.value) == true) {
    return true;
  } else {
    console.log("The Name Should began with  a capital char");
    return false;
  }
}

function validationProductPrice() {
  var regex = /^([1-9][0-9]{1,3}|10000)$/;
  if (regex.test(productPriceInput.value) == true) {
    return true;
  } else {
    console.log("The Price Should be a Number between 10 to 10000");
    return false;
  }
}

function validationProductCategory() {
  var regex = /^(mobile|tv|labtop)$/gmi;
  if (regex.test(productCategoryInput.value) == true) {
    return true;
  } else {
    console.log("The Category not defined");
    return false;
  }
}



function validateInput() {
  toggleError("errorInputNameId", validationProductName(), productNameInput.value);
  toggleError("errorInputPriceId", validationProductPrice(), productPriceInput.value);
  toggleError("errorInputCategId", validationProductCategory(), productCategoryInput.value);

  mainBtn.disabled = !(validationProductName() && validationProductPrice() && validationProductCategory());
}

function toggleError(id, isValid, value) {
  var element = document.getElementById(id);
  //  لا تظهر الخطأ الا إذا كان الحقل فارغاً 
  if (isValid || value === "") {
    element.classList.add("d-none");
  } else {
    element.classList.remove("d-none");
  }
}









/*

function validateInput()
{  
  var errorText;  
  var allFilled = true;

  if(validationProductName() == false)
  {
    errorText = document.getElementById("errorInputNameId");
    errorText.classList.remove("d-none");
    allFilled = false;
  }
   if(validationProductPrice() == false)
  {
    errorText = document.getElementById("errorInputPriceId");
    errorText.classList.remove("d-none");
    allFilled = false;
  }
   if(validationProductCategory() == false)
  {
    errorText = document.getElementById("errorInputCategId");
    errorText.classList.remove("d-none");
    allFilled = false;
  }
}
*/

/*

function disapperButton()
{
  
 //  true: يعني الزرار "معطل" (Disabled) ومحدش يقدر يدوس عليه.
  // false: يعني الزرار "شغال" (Enabled) والمستخدم يقدر يتفاعل معاه.
  
    var btnFlag;
    if (true) {
        console.log("In")
        btnFlag = document.getElementById("btn");    
        btnFlag.disabled = false; 
    }
    console.log("Out");
}

*/




