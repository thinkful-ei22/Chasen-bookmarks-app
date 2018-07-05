'use strict';
/* global $ store, api, toastr */


const bookmarkList = (function(){

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
      const validatedBookmark = store.validateBookmark(newBookmark);
      
      if (store.error !== null){
        handleErrorCreateBookmark(store.error);
      }
      else{
        api.createBookmark(validatedBookmark, handleSuccessfulCreateBookmark, handleErrorCreateBookmark);
      }
    });
  }

  function handleErrorCreateBookmark (){
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
    render();
  }

  function handleSuccessfulCreateBookmark(bookmark){
    store.addBookmark(bookmark);
    render();
  }


  function handleClickedBookmark(){
    $('.bookmark-list').on('click', '.bookmark-item', function(){
      console.log('bookmark clicked');
      let bookmarkId= $(this).attr('data-id');
      console.log(bookmarkId);
      store.toggleBookmark(bookmarkId);
      render();
    });
  }

  function handleClickedAddBookmark(){
    $('.add-bookmark-button').click(function(event){
      store.toggleAdding();
      console.log(store.adding);
      store.setErrortoNull();
      render();
    });    
  }

  function handleClickCancelButton(){
    $('#js-bookmark-form').on('click', '.js-bookmark-cancel-btn' , function(event){
      event.preventDefault();
      console.log('cancel clicked');
      store.toggleAdding();
      render();
    });
  }

  function handleClickDeleteButton(){
    $('.bookmark-list').on('click','.delete-button',function(event){
      event.stopPropagation();
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

  function handleVisitSiteClick(){
    $('.bookmark-list').on('click', '.url-link-button', function(event){
      event.stopPropagation();
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
    ////this stars can be listed as an object instead of switch//////
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
      const bookmarkHtml = filteredArr.map(bookmark => generateBookmarkElement(bookmark)).join('');
      $('.bookmark-list').html(bookmarkHtml);
    }else{
      const bookmarkHtml = store.bookmarks.map(bookmark => generateBookmarkElement(bookmark)).join('');
      $('.bookmark-list').html(bookmarkHtml);
    }
  };

  function generateFormElement(){
    const formHtml= !store.adding? '':`
      <legend>Create a Bookmark</legend>
      <div class='title-url-star'>
        <label for='bookmark-title-entry' class='entry'>Title</label>
        <input type="text" id="bookmark-title-entry" class="js-title-entry entry ${store.error === 'Title is Required' ? 'border__error' : ''}" placeholder="Title">
        <label for='bookmark-url-entry' class='entry'>Url </label>
        <input type="text" id="bookmark-url-entry" class="js-url-entry entry ${store.error === 'Url with http/https is Required' ? 'border__error' : ''}" placeholder="URL Link">
        <label for='bookmark-description-entry' class='entry' >Description</label>
        <textarea name="bookmark-description-entry" class="js-description-entry description-entry entry ${store.error === 'Description is Required' ? 'border__error' : ''}" placeholder="Description of Bookmark"></textarea>
        <select name="bookmark-rating" class="js-rating-entry entry">
          <option value="5">&starf;&starf;&starf;&starf;&starf;</option>
          <option value="4">&starf;&starf;&starf;&starf;&star;</option>
          <option value="3">&starf;&starf;&starf;&star;&star;</option>
          <option value="2">&starf;&starf;&star;&star;&star;</option>
          <option value="1">&starf;&star;&star;&star;&star;</option>
        </select>
      </div>
      <div>  
        <button type="submit" class='js-bookmark-submit-btn btn'>Submit</button>
        <button type="cancel" class='js-bookmark-cancel-btn btn'>Cancel</button>
      </div>
      `;
    $('#js-bookmark-form').html(formHtml);
  }


  
  function render(){
    filterBookmarksByRating(store.ratingfilter);
    generateFormElement();
    //keeping for future development///
    // console.log(store.bookmarks); 
  }

  function bindEventListeners(){
    handleNewBookmarkSubmit();
    handleClickedBookmark();
    handleClickedAddBookmark();
    handleClickCancelButton();
    handleClickDeleteButton();
    handleRatingFilterClick();
    handleVisitSiteClick();
  }

  return{
    render,
    bindEventListeners,
  };
}());