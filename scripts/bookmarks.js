'use strict';
/* global $ store, api,  */

const bookmarkList = (function(){

  function validateBookmark(bookmark){
    $('.js-title-entry').removeClass('red-border');
    $('.js-url-entry').removeClass('red-border');
    $('.js-description-entry').removeClass('red-border');

    if (bookmark.title.length<1){
      
      $('.js-title-entry').addClass('red-border');
      return store.error = 'Title is Required';
    }
    if (bookmark.url.length<5 || !bookmark.url.includes('http')){
      $('.js-url-entry').addClass('red-border');
      return store.error = 'Url with http/https is Required';
    }
    if (bookmark.desc< 1){
      $('.js-description-entry').addClass('red-border');
      return store.error = 'Description is Required';      
    }
    else{
      store.error = null;
      return bookmark;
    }
  }

  function handleNewBookmarkSubmit(){
    $('#js-bookmark-form').on('click','.js-bookmark-submit-btn', function(event){
      event.preventDefault();

      const newBookmarkTitle = $('.js-title-entry').val();
      $('.js-title-entry').val('');
      const newBookmarkUrl = $('.js-url-entry').val();
      $('.js-url-entry').val('');
      const newBookmarkDescription= $('.js-description-entry').val();
      $('.js-description-entry').val('');
      const newBookmarkRating= $('.js-rating-entry').val();
      $('.js-rating-entry').val('');

      const newBookmark= {
        title: newBookmarkTitle,
        url: newBookmarkUrl,
        desc: newBookmarkDescription,
        rating: newBookmarkRating,   
      };
      const validatedBookmark = validateBookmark(newBookmark);
      console.log(validatedBookmark);
      api.createBookmark(validatedBookmark, bookmark => {
        store.addBookmark(bookmark);
        console.log(bookmark);
        render();
      }, (err) => {
        toastr['error'](store.error, 'Error');
        toastr.options = {
          'closeButton': true,
          'debug': false,
          'newestOnTop': false,
          'progressBar': false,
          'positionClass': 'toast-top-right',
          'preventDuplicates': false,
          'onclick': null,
          'showDuration': '300',
          'hideDuration': '1000',
          'timeOut': '5000',
          'extendedTimeOut': '1000',
          'showEasing': 'swing',
          'hideEasing': 'linear',
          'showMethod': 'fadeIn',
          'hideMethod': 'fadeOut'
        };
      });
    });
  }

  function handleClickedBookmark(){
    $('.bookmark-list').on('click', '.bookmark-item', function(){
      console.log('bookmark clicked');
      let bookmarkId= $(this).attr('data-id');
      console.log(bookmarkId);
      store.toggleBookmark(bookmarkId);
      render();

      //this has and data-id we can target

      // store.bookmarks.extended = true;
    });

  }

  function handleClickedAddBookmark(){
    $('.add-bookmark-button').click(function(event){
      console.log('button clicked');
      const formHtml=`
        <legend>Create a Bookmark</legend>
        <div class='title-url-star'>
          <input type="text" name="bookmark-title-entry" class="js-title-entry entry" placeholder="Title">
          <input type="text" name="bookmark-url-entry" class="js-url-entry entry" placeholder="URL Link">
          <select name="bookmark-rating" class="js-rating-entry entry">
            <option value="5">&starf;&starf;&starf;&starf;&starf;</option>
            <option value="4">&starf;&starf;&starf;&starf;&star;</option>
            <option value="3">&starf;&starf;&starf;&star;&star;</option>
            <option value="2">&starf;&starf;&star;&star;&star;</option>
            <option value="1">&starf;&star;&star;&star;&star;</option>
          </select>
        </div>
        
          <textarea name="bookmark-description-entry" class="js-description-entry" placeholder="Description of Bookmark"></textarea>
        <div>  
          <button type="submit" class='js-bookmark-submit-btn'>Submit</button>
          <button type="cancel" class='js-bookmark-cancel-btn'>Cancel</button>
        </div>
        `;
      $('#js-bookmark-form').html(formHtml);
      $('.row1').hide();
      
    });
      
  }

  function handleClickCancelButton(){
    $('.js-bookmark-form').on('click', '.js-bookmark-cancel-btn' , function(event){
      console.log('reset');
    });
  }

  function handleClickDeleteButton(){
    $('.bookmark-list').on('click','.delete-button',function(event){
      console.log(event.currentTarget);
      const id = $(event.currentTarget).attr('data-id');
      console.log(id);
      api.deleteBookmark(id, function(){
        store.findAndDelete(id);
        render();
      });
      
    });
  }

  function handleRatingFilterClick(){
    $('.js-rating-selection').on('click', function(event){
      const currentSelection = $(event.currentTarget).val();
      store.ratingfilter = currentSelection;
      console.log(store);
      render();
    });

  }

  function generateBookmarkElement(bookmark){
    let stars = parseInt(bookmark.rating);
    switch(stars){
    case 5:
      stars='★★★★★';
      break;
    case 4:
      stars='★★★★☆';
      break;
    case 3:
      stars='★★★☆☆';
      break;
    case 2:
      stars='★★☆☆☆';
      break;
    default: 
      stars='★☆☆☆☆';
      break; 
    }

    return `
    <li class='bookmark-item' data-id=${bookmark.id}>
      <div class='title-bar'>
          <h2 class='bookmark-title'>${bookmark.title}</h2>
          <button class='delete-button' data-id=${bookmark.id}><i class="fa fa-trash-o"></i></button>
      </div>
      <div class='bookmark-description-text-area'>
        <p class='bookmark-description ${!bookmark.expanded ? 'js-bookmark-expanded' : ''}'>${bookmark.desc}</p>
      </div>
      <div class="rating">
        <span>${stars}</span>
        <a href=${bookmark.url} target="_blank"><button class='url-link-button ${!bookmark.expanded ? 'js-bookmark-expanded' : ''}'>Visit Site</button></a>
      </div> 
    </li>`;
    
  }

  const filterBookmarksByRating = function(rating){
    if(rating >1){
      let filteredArr= store.bookmarks.filter(bookmark => bookmark.rating >= rating);
      console.log(filteredArr);
      const bookmarkHtml = filteredArr.map(bookmark => generateBookmarkElement(bookmark)).join('');
      $('.bookmark-list').html(bookmarkHtml);
      
    }else{
      const bookmarkHtml = store.bookmarks.map(bookmark => generateBookmarkElement(bookmark)).join('');
      $('.bookmark-list').html(bookmarkHtml);
    }
  };
  

  function render(){
    filterBookmarksByRating(store.ratingfilter);
    



    console.log(store.bookmarks);
  }


  function bindEventListeners(){
    handleNewBookmarkSubmit();
    handleClickedBookmark();
    handleClickedAddBookmark();
    handleClickCancelButton();
    handleClickDeleteButton();
    handleRatingFilterClick();

    console.log('eventlisteners ran');
  }




  return{
    render,
    bindEventListeners,
  };




}());