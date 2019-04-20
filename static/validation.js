var validity={username:false,password:false,email:false,phone:false};
var capital_vald=false;
var small_vald=false;
var digit_vald=false;
var special_vald=false;
var length_vald=false;
var sp_vald=false;
var allUsers=null;
var row_no=0;


function done_this(val) {
	document.getElementById('search_input').value=val;
	var table=document.getElementById('suggestion');
	for(var i = table.rows.length - 1; i >= 0; i--){
	    table.deleteRow(i);
	}
	row_no=0;
	document.getElementById('autocomplete-items').style.display='none';
}

function init(argument) {
	allUsers=argument;
	var table=document.getElementById('suggestion');

	for(var i = table.rows.length - 1; i >= 0; i--){
	    table.deleteRow(i);
	}
	row_no=0;
	document.getElementById('autocomplete-items').style.display='none';
}

function auto_complete(id) {

	//alert(id);

	var table=document.getElementById('suggestion');

	for(var i = table.rows.length - 1; i >= 0; i--){
	    table.deleteRow(i);
	}
	row_no=0;


	document.getElementById('autocomplete-items').style.display='none';

	if (document.getElementById(id).value.length>0){


		document.getElementById('autocomplete-items').style.display='inline-block';

		for (var i = 0; i < allUsers.length; i++) {
			if (allUsers[i].toUpperCase().includes(document.getElementById(id).value.toUpperCase())){
				var row=table.insertRow(row_no);
				row.className='suggestion_row';
				row.insertCell(0).innerHTML=allUsers[i];
				row_no++;
			}
		}

		for (var i = 0; i < row_no; i++) {
			//document.getElementById('suggestion_row'+i).addEventListener('click',done_this('suggestion_row'+i));

			var table = document.getElementById("suggestion");
			    var rows = table.getElementsByTagName("tr");
			    for (i = 0; i < rows.length; i++) {
			        var currentRow = table.rows[i];
			        var createClickHandler = 
			            function(row) 
			            {
			                return function() { 
								var cell = row.getElementsByTagName("td")[0];
								var val = cell.innerHTML;
								done_this(val);
							};
			            };

			        currentRow.onclick = createClickHandler(currentRow);
			    }
		}
	}
}

function hide() {
	document.getElementById('flash').style.display='none';
}

function form_submit(all_Users) {
	var chng=true;
	for (var i = 0; i < all_Users.length; i++) {
		if (all_Users[i].toUpperCase().localeCompare(document.getElementById('email').value.toUpperCase())==0) {
			if(confirm('Email '+all_Users[i]+ ' Already Exists. Do You want to Update Details for this Email ID ?')){
				break;
			} else{
				chng=false;
				break;
			}
		}
	}

	if(validity['username'] && validity['password'] && validity['email'] && validity['phone'] && chng){
		return true;
	} else if(chng==true){
		alert('Invalid Inputs Provided. Please Check your Inputs');
		return false;
	} else{
		return false;
	}
}

function username_validation() {
	var user = document.getElementById("username");
	var user_criteria = document.getElementById("username_criteria");

	for (var i=0; i<user.value.length; i++) {

		if((user.value[i]<'A' || user.value[i]>'Z') && (user.value[i]<'a' || user.value[i]>'z') && user.value[i]!=' '){
			user.value = user.value.slice(0,user.value.length-1);
			alert('Name Contains Only Alphabetical Letters');
		}
	}

	if(user.value.length>=3){
		user_criteria.style.display='none';
		validity['username']=true;
	} else{
		user_criteria.style.display='block';
		validity['username']=false;
	}
}

function email_validation() {
	var email = document.getElementById('email');
	var criteria = document.getElementById('email_criteria');
	if (/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(email.value)){
		validity['email']=true;
		criteria.style.display='none';
	}
	else{
		validity['email']=false;
		criteria.style.display='block';
	}
}

function password_validation() {
	var pass = document.getElementById('password');
	var capital = document.getElementById('capital');
	var small = document.getElementById('small');
	var digit = document.getElementById('digit');
	var special = document.getElementById('special');
	var pass_length = document.getElementById('pass_length');
	var criteria = document.getElementById('password_criteria');

	for (var i=0; i<pass.value.length; i++) {

		sp_vald=true;

		if(pass.value[i]<'a' || pass.value[i]>'z'){
			if(pass.value[i]<'A' || pass.value[i]>'Z'){
				if(pass.value[i]<'0' || pass.value[i]>'9'){
					if(pass.value[i]!='@' && pass.value[i]!='#' && pass.value[i]!='!' && pass.value[i]!='%' && pass.value[i]!='&'){
						sp_vald=false;
						pass.value = pass.value.slice(0,pass.value.length-1);
					}
				}
			}
		}
	}

	if(/[a-z]/.test(pass.value)){
		small.style.display='none';
		small_vald=true;
	}
	else{
		small.style.display='block';
		small_vald=false;
		small.style.marginTop='-15px';
	}
	if(/[A-Z]/.test(pass.value)){
		capital.style.display='none';
		capital_vald=true;
	}
	else{
		capital.style.display='block';
		capital_vald=false;
		capital.style.marginTop='-15px';
	}
	if(/[0-9]/.test(pass.value)){
		digit.style.display='none';
		digit_vald=true;
	}
	else{
		digit.style.display='block';
		digit_vald=false;
		digit.style.marginTop='-15px';
	}
	if(/@|#|!|%|&/.test(pass.value)){
		special.style.display='none';
		special_vald=true;
	}
	else{
		special.style.display='block';
		special_vald=false;
		special.style.marginTop='-15px';
	}
	if(pass.value.length>=8){
		pass_length.style.display='none';
		length_vald=true;
	}
	else{
		pass_length.style.display='block';
		length_vald=false;
		pass_length.style.marginTop='-15px';
	}



	if(capital_vald && small_vald && digit_vald && special_vald && length_vald && sp_vald){
		validity['password']=true;
		criteria.style.display='none';
	}
	else{
		validity['password']=false;
		if(!sp_vald){
			alert('Only these special characters are allowed @,#,!,%,&')
		}
		else{
			criteria.style.display='block';
		}
		
	}
}

function criteria_display(id) {
	if(!validity[id]){
		document.getElementById(id+'_criteria').style.display='block';
	}
}

function phone_validation(){
	var phone = document.getElementById('phone');
	var criteria = document.getElementById('phone_criteria');

	for (var i=0; i<phone.value.length; i++) {

		if(phone.value[i]<'0' || phone.value[i]>'9'){
			phone.value = phone.value.slice(0,phone.value.length-1);
			alert('Only Number is Allowed');
		}
	}

	if(/^\d{10}$/.test(phone.value)){
		criteria.style.display='none';
		validity['phone']=true;
	}
	else{
		criteria.style.display='block';
		validity['phone']=false;
	}	
}
