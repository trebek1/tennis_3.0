"use strict"

import axios from "axios"; 

export function getCourts(){
	return function(dispatch){
		axios.get("/courts")
		.then(function(response){
			dispatch({type: "GET_COURTS", payload: response.data});
		})
		.catch(function(err){
			// dispatch({type: "GET_BOOKS_REJECTED", payload: err});
			console.log("an error occurred"); 
		});	
	};
};

export function selectStyle(type){
	return {type: "SELECT_STYLE", payload: type};	
};

export function sortPoints(type){
	return {type: "SORT_POINTS", payload: type};
};

export function selectPoint(index){
	return {type: "SELECT_POINT", payload: index};
};

export function updateSort(sort){
	return {type: "UPDATE_SORT", payload: sort}; 
};

	
