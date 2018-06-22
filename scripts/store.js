'use strict';

/*global */

const store = (function () {
  const bookmarks = [];
  const adding = false;
  let ratingfilter = 1;
  const error = null;
  
  const addBookmark = function(bookmark) {
    this.bookmarks.push(bookmark);
    // console.log(bookmark);
  };

  const toggleBookmark = function(bookmarkId){
    this.bookmarks = this.bookmarks.map(bookmark => {
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
    addBookmark,
    toggleBookmark,
    bookmarks,
    adding,
    ratingfilter,
    error,
    findAndDelete,

  };
}());