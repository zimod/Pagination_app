const display_number = 10;//we set the numbers of display on each page
const student_list = document.querySelector('.student-list');//the ul student list
const list_items = student_list.children; //all the li items inside student list as an array of objects



// if student should be on this page index(start from 0),show the student
const  showPage = (list,page_index)=> {//first param accept a list of li , second is a number for page index
        for(let i=0 ; i<list.length;i+=1){//loop through the whole list
          if(Math.floor(i/display_number) === page_index){//really important condition, for example all student index from 0 to 9 will be mapped to page 0 and so on
             list[i].style.display = "block";
          }else{
             list[i].style.display = "none";
          }
        }
 };

//function to hide the whole student list, also remove the pagination links
const hidePage = ()=>{
   for(let i=0 ; i<list_items.length;i+=1){//loop through the whole list
       list_items[i].style.display = "none";//hide list items
   }
   $('.pagination').remove();//remove all links
   $('.no-result').remove();//remove the no result notification if no matching results
};

const appendPageLinks = (list_items)=> {//take a list as argument
  //this helper function will tell us how many pagination links do we need based on the number of
  //students and display per page
  const amount_of_links = () =>{
       //for example we need link index from 0 to 5 for 55 students because floor(55/10) = 5
       //please notice that when link_index = 5 means we need 6 links in this case
       const link_index = Math.floor((list_items.length-1)/display_number);//-1 to correct of 10*n situations
       return link_index+1;
  };
  const link_amount = amount_of_links();
  $('.page').append('<div class = "pagination"><div>');//create the pagination div and append it to the page
  $('.pagination').append('<ul class = "pagination-list"></ul>');//create the ul inside pagination
  if(link_amount>1){//this is when we have more items for 1 page, so we need the links
    for(let i = 0;i<link_amount;i+=1){//loop through the total link amount,append all links
      const $li = $(`<li><a href = "#"> ${i+1} </a></li>`);//the value of i+1 which is the page number
      $('.pagination-list').append($li);
    }
    $('.pagination-list li').on("click",function(){//add the on click event handler for every link
       console.log($(this)[0].textContent);//the textContent inside each li is the related page number
       const page_index = $(this)[0].textContent-1;//page index starts from 0 , so index 0 is page 1
       showPage(list_items,page_index);//call the showPage method to show related page content
       $(this).children().toggleClass("active");//when clicked on toggle the class name to active
       $(this).siblings().children().attr("class","not-active");//all other li siblings set the class to not active
    });
  }
 };

//add the search bar and button in the html
const add_search = ()=>{
   const $search = $(
   `<div class="student-search">
     <input placeholder="Search for students...">
     <button class = "search-button">Search</button>
   </div>`);
   $('.page-header').append($search);//append our search element to the page header class
};

//the function that will list all results that match the user imput when click the search button
const searchList = ()=> {
 $('.search-button').on('click',function(){
    let new_list = [];//we are going to store all the mathcing results in this new array everytime user clicks the search button
    hidePage();//hide every list item as well as removing all links when clicked the search button
    let $input_value = $('input').val();//the user input value
    //console.log($input_value);
    let $name = '';
    let $email = '';
    for(let i = 0;i<list_items.length;i+=1){//loop through the whole list
       $name = $(list_items).find('h3')[i].textContent//this is the current index i student's name in the list
       $email = $(list_items).find('.email')[i].textContent//this is the current index i student's email in the list
       if($name.toUpperCase().includes($input_value.toUpperCase())||$email.toUpperCase().includes($input_value.toUpperCase())){
         //if either the name or email contains user input, this is NOT case sensitive
         list_items[i].style.display = "block";//only show the matching results
         new_list.push(list_items[i]);//we push the matching li to our new list
       }
    }
    if(new_list.length ===0){//means there is no matching result
       $( '<p class = "no-result">Sorry, we cannot find any names or emails related to your search, try another! </p>' ).insertBefore( ".student-list" );
    }
    console.log(new_list);
    showPage(new_list,0);//call showPage on the newlist instead
    appendPageLinks(new_list);//create our links using this new list
  });
};

const main = ()=>{//our main function
  add_search();
  showPage(list_items,0);
  appendPageLinks(list_items);

  searchList();
};

main();
