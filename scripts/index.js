'use strict';
/* global $ api bookmarkList store */

$(document).ready(function(){
  api.getBookmarks(items => {
    items.forEach(item => store.addBookmark(item));
    bookmarkList.render();
  });
  bookmarkList.bindEventListeners();
});

