function Validator(option) {
    var selectorRules = {};

    // Hàm thực hiện Validate
    function validate(inputElement, rule) {
        var errorMessage;
        var formMessage = inputElement.parentElement.querySelector(option.errorSelector);

        // Lấy ra các rules của selector
        var rules = selectorRules[rule.selector];
        
        // Lặp qua từng rule và kiểm tra
        // Nếu có lỗi => dừng việc kiểm tra
        for (var i = 0; i < rules.length; i++) {
            errorMessage = rules[i](inputElement.value);
            if (errorMessage) break;
        }

        if (errorMessage) {
            formMessage.innerText = errorMessage;
            inputElement.parentElement.classList.add('invalid')
        }
        else {
            formMessage.innerText = '';
            inputElement.parentElement.classList.remove('invalid')
        }
    }

    // Lấy element của form cần validate
    var formElement = document.querySelector(option.form);
    if (formElement) {
        // Khi Submit form
        formElement.onsubmit = function(e) {
            e.preventDefault();
        
            // Lặp qua từng rule và validate 
            option.rules.forEach(rule => {
                var inputElement = formElement.querySelector(rule.selector);
                validate(inputElement, rule)
            })
        }

        // Lặp mỗi rule và xử lí (lắng nghe sự kiện blur, input, ...)
        option.rules.forEach((rule, index) => {
            // Lưu lại các rules cho mỗi input
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            }
            else {
                selectorRules[rule.selector] = [rule.test];
            }

            var inputElement = formElement.querySelector(rule.selector);
            var formMessage = inputElement.parentElement.querySelector(option.errorSelector);

            if (inputElement) {
                // Xử lí trường hợp blur khỏi input
                inputElement.onblur = function() {
                    validate(inputElement, rule);
                }

                // Xử lí mỗi khi người dùng nhập vào input
                inputElement.oninput = function() {
                    formMessage.innerText = '';
                    inputElement.parentElement.classList.remove('invalid')
                }
            }
        })
    }
}

Validator.isRequired = function(selector, message) {
    return {
        selector: selector,
        test: function(value) {
            return value.trim() ? undefined : message || 'Vui lòng nhập lại trường này!';
        }
    }
} 

Validator.isEmail = function(selector, message) {
    return {
        selector: selector,
        test: function(value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : message || 'Trường này phải là Email'
        }
    }
}

Validator.minLength = function(selector, min, message) {
    return {
        selector: selector,
        test: function(value) {
            return value.length >= min ? undefined : message || `Vui lòng nhập tối thiểu ${min} ký tự`;
        }
    }
}   

Validator.isConfirmed = function(selector, getConfirmValue, message) {
    return {    
        selector: selector,
        test: function(value) {
            return value === getConfirmValue() ? undefined : message || 'Vui lòng nhập chính xác'
        }
    }
}
Validator.isNumber = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^-?[\d.]+(?:e-?\d+)?$/
            return regex.test(value) ? undefined : message || 'Vui lòng nhập vào số'
        }
    }
}