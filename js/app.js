const display_number = 10;//we set the numbers of display on each page
const student_list = document.querySelector('.student-list');//the ul student list
const student_list_children = student_list.children; //all the li items inside student list as an array of objects



// if student should be on this page index(start from 0),show the student
const  showPage = (page_index)=> {

        for(let i=0 ; i<student_list_children.length;i+=1){//loop through the whole list
          if(Math.floor(i/display_number) === page_index){//really important condition, for example all student index from 0 to 9 will be mapped to page 0 and so on
             student_list_children[i].style.display = "block";
          }else{
             student_list_children[i].style.display = "none";
          }
        }
 };

const appendPageLinks = (list_items)=> {//take a list as argument



  //this helper function will tell us how many pagination links do we need based on the number of
  //students and display per page
  const amount_of_links = () =>{
       //for example we need link index from 0 to 5 for 55 students because floor(55/10) = 5
       //please notice that when link_index = 5 means we need 6 links in this case
       const link_index = Math.floor(list_items.length/display_number);
       return link_index+1;
  };
  const link_amount = amount_of_links();

  $('.page').append('<div class = "pagination"><div>');//create the pagination div and append it to the page
  $('.pagination').append('<ul class = "pagination-list"></ul>');//create the ul inside pagination
  for(let i = 0;i<link_amount;i+=1){//loop through the total link amount,append all links
    const $li = $(`<li><a href = "#"> ${i+1} </a></li>`);//the value of i+1 which is the page number
    $('.pagination-list').append($li);
  }

  $('.pagination-list li').on("click",function(){//add the on click event handler for every link
     console.log($(this)[0].textContent);//the textContent inside each li is the related page number
     const page_index = $(this)[0].textContent-1;//page index starts from 0 , so index 0 is page 1
     showPage(page_index);//call the showPage method to show related page content
     $(this).children().toggleClass("active");//when clicked on toggle the class name to active
     $(this).siblings().children().attr("class","not-active");//all other li siblings set the class to not active
  });

 };
 appendPageLinks(student_list_children);
 showPage(0);
