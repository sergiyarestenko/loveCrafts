var FormFunction = function (form) {

	var self = this,
		email = form.querySelector('input[name="email"]'),
		birthday = form.querySelector('input[name="birthday"]'),
		pass_1 = form.querySelector('input[name="pass_1"]'),
		pass_2 = form.querySelector('input[name="pass_2"]'),
		button = form.querySelector('button');

	(function () {
		email.addEventListener('mouseover',function () {
			self.clearError(email);
		});
		birthday.addEventListener('mouseover',function () {
			self.clearError(birthday);
		});
		pass_1.addEventListener('mouseover',function () {
			self.clearError(pass_1);
		});
		pass_2.addEventListener('mouseover',function () {
			self.clearError(pass_2);
		});
		button.disabled = true;
	})();

	(function () {
		var inputs = form.querySelectorAll('input');
		for (var i = 0; i < inputs.length; i ++){
			inputs[i].onblur = function () {
				self.onBlur();
			};
		}
	})();

	this.onBlur = function () {
		if(email.value.trim() == ''||birthday.value.trim() == ''||pass_1.value.trim() == ''||pass_2.value.trim() == ''){
			return false;
		}
		button.disabled = false;
	};

	this.submitForm = function () {
		self.validateDate();
		self.validateEmail();
		self.checkPasswords();
		if(!self.validateDate()||!self.validateEmail()||!self.checkPasswords()){
			return false;
		}
		this.ajaxReq();
		return false;
	};

	this.ajaxReq = function () {
		var formData = new FormData(form),
			xhr = new XMLHttpRequest();
		xhr.open('POST', 'target.php');
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
				if(xhr.status == 200) {
					self.showResult(true, JSON.parse(xhr.responseText));
				} else {
					self.showResult(false);
				}
			}
		};
		xhr.send(formData);
	};
	this.showResult = function (f,str) {
		if(f){
			self.showLoader();
			alert ('Welcome '+ str);
			self.hideLoader();
		}else {
			self.showLoader();
			alert ('Something wrong, try later.');
			self.hideLoader();
		}
	};

	this.showLoader = function () {
		form.querySelector('.button-holder').classList.add('loaded');
	};

	this.hideLoader = function () {
		form.querySelector('.button-holder').classList.remove('loaded');
	};

	this.validateEmail = function () {
		var address = email.value;
		address = address.trim();
		if (address == ''){
			self.emptyValue(email);
			return false;
		}
		if (!(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/igm.test(address))) {
			self.incorrectValue(email);
			return false;
		}
		return true;
	};

	this.validateDate = function () {
		var date = birthday.value;
		date = date.trim();
		if (date == ''){
			self.emptyValue(birthday);
			return false;
		}
		date = date.replace(/ /g,'.').replace(/-/g,'.').replace(/\//g,'.');//more opportunities for entering dates
		date = date.split('.');
		date[1] -= 1;
		var d = new Date(date[2], date[1], date[0]);
		var currentDate = new Date;
		if ((d.getFullYear() == date[2]) && (d.getMonth() == date[1]) && (d.getDate() == date[0])) {
			if(currentDate > d) {
				return true;
			}
			self.incorrectValue(birthday);
			return false;
		} else {
			self.incorrectValue(birthday);
			return false;
		}
	};

	this.checkPasswords = function () {
		if(pass_1.value.trim() == ''){
			self.emptyValue(pass_1);
			return false;
		}
		if(pass_2.value.trim() == ''){
			self.emptyValue(pass_2);
			return false;
		}
		if(pass_1.value != pass_2.value){
			self.notMatch(pass_1);
			self.notMatch(pass_2);
			return false;
		}
		return true;
	};

	this.clearError = function (el) {
		el.parentNode.classList.remove('error');
		el.parentNode.classList.remove('incorrect');
		el.parentNode.classList.remove('empty');
		el.parentNode.classList.remove('match');
	};

	this.incorrectValue = function (el) {
		el.parentNode.classList.add('error');
		el.parentNode.classList.add('incorrect');
		button.disabled = true;
	};

	this.emptyValue = function (el) {
		el.parentNode.classList.add('error');
		el.parentNode.classList.add('empty');
		button.disabled = true;
	};

	this.notMatch = function (el) {
		el.parentNode.classList.add('error');
		el.parentNode.classList.add('match');
		button.disabled = true;
	};
};

if(document.getElementById('exercise-form')){
	var formFunction = new FormFunction(document.getElementById('exercise-form'));
}

