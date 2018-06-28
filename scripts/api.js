'use strict';
/*global api $ */

const api = (function(){
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/chasen/bookmarks';

  const getBookmarks = function(callback){
    $.getJSON(BASE_URL, callback);
  };

  const createBookmark= function(bookmark, onSuccess, onError){
    const newBookmark= JSON.stringify(bookmark);
    $.ajax({
      'url': BASE_URL,
      'method': 'POST',
      'contentType': 'application/json',
      'data': newBookmark,
      'success': onSuccess,
      'error': onError,
    });
  };

  const deleteBookmark = function(id, onSuccess) {
    $.ajax({
      url: BASE_URL+ '/'+ id,
      method: 'DELETE',
      success: onSuccess
    });
  };

  return{
    getBookmarks,
    createBookmark,
    deleteBookmark    
  };
}());

