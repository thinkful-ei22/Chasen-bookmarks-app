'use strict';
/* global $ store, api,  */

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
        expanded: false    
      };
      console.log(newBookmark);
      api.createBookmark(newBookmark, bookmark => {
        store.addBookmark(newBookmark);
        console.log(newBookmark);
        render();
                  ///not pushing to database correctly extended//////
      });
    });
  }

  function handleClickedBookmark(){
    $('.bookmark-list').on('click', '.bookmark-item', function(){
      console.log('bookmark clicked');
      let bookmarkId= $(this).attr('data-id');
      store.toggleBookmark(bookmarkId);
      console.log(store.bookmarks.expanded);
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
          <input type="text" name="bookmark-title-entry" class="js-title-entry" placeholder="Title">
          <input type="text" name="bookmark-url-entry" class="js-url-entry" placeholder="URL Link">
          <button type="submit" class='js-bookmark-submit-btn'>Submit</button>
          <button type="cancel" class='js-bookmark-cancel-btn'>Cancel</button>
          <input type="text" name="bookmark-description-entry" class="js-description-entry" placeholder="Description of Bookmark">
          <select name="bookmark-rating" class="js-rating-entry">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
          </select>
        `;
      console.log(formHtml);
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
      const id = $('.bookmark-item').attr('data-id');
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
    return `
    <li class='bookmark-item' data-id=${bookmark.id}>
      <div class='title-bar'>
          <h2 class='bookmark-title'>${bookmark.title}</h2>
          <button class='delete-button' ><i class="fa fa-trash-o"></i></button>
      </div>
        <div class="rating">
          <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
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