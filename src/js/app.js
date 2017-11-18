

var FormFunction = function (form) {

	var self = this,
		email = form.querySelector('input[name="email"]'),
		birthday = form.querySelector('input[name="birthday"]'),
		pass_1 = form.querySelector('input[name="pass_1"]'),
		pass_2 = form.querySelector('input[name="pass_2"]');

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

	})();

	this.submitForm = function () {
		if(!self.validateDate()&&!self.validateEmail()&&!self.checkPasswords()){
			return false;
		}
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
		el.parentNode.classList.remove('incorrect');
		el.parentNode.classList.remove('empty');
		el.parentNode.classList.remove('match');
	};

	this.incorrectValue = function (el) {
		el.parentNode.classList.add('incorrect');
	};

	this.emptyValue = function (el) {
		el.parentNode.classList.add('empty');
	};

	this.notMatch = function (el) {
		el.parentNode.classList.add('match');
	};

};

var formFunction = new FormFunction(document.getElementById('exercise-form'));
