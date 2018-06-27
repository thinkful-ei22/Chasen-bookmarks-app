'use strict';

/*global */

const store = (function () {
  const bookmarks = [];
  const adding = false;
  const ratingfilter = 1;
  const error = null;
  
  function validateBookmark(bookmark){
    if (bookmark.title.length<1){
      this.error = 'Title is Required';
      return undefined;
    }
    else if (bookmark.url.length<5 || !bookmark.url.includes('http')){
      this.error = 'Url with http/https is Required';
      return undefined;
    }
    else if (bookmark.desc< 1){
      this.error = 'Description is Required';  
      return undefined;    
    }
    else{
      this.error = null;
      return bookmark;
    }
  }


  const addBookmark = function(bookmark) {
    bookmark.expanded = false;
    this.bookmarks.push(bookmark);
    // console.log(bookmark);
  };

  const toggleAdding = function(){
    this.adding = !this.adding;
  };

  const toggleBookmark = function(bookmarkId){
    this.bookmarks = this.bookmarks.map(bookmark => {
      console.log(bookmark.expanded);
      if(bookmarkId === bookmark.id){
        bookmark.expanded = !bookmark.expanded;
      }
      return bookmark;
    });
  };

  

  const findAndDelete = function(id) {
    this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id !== id);
  };
  

  return {
    validateBookmark,
    addBookmark,
    toggleBookmark,
    bookmarks,
    adding,
    ratingfilter,
    error,
    findAndDelete,
    toggleAdding,

  };
}());