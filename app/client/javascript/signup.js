$(document).ready(function () {
  $("#signup_submit_btn").on("click", (e) => {
    validate();
  });

  $("#signup_form").on("submit", (e) => {
    e.preventDefault();

    const $form = $(e.currentTarget);
    $.ajax({
      type: "POST",
      url: $form.attr("action"),
      data: $form.serialize(),
      contentType: "application/x-www-form-urlencoded",
      dataType: "json",
      processData: false,
    })
      .done((data, textStatus, jqXHR) => {
        $form[0].reset();

        window.location.href = "/home";
      })
      .fail((jqXHR, textStatus, errorThrown) => {
        alert(jqXHR.responseJSON.message);
      })
      .always((jqXHR, textStatus, errorThrown) => {});
  });

  function validate() {
    var username = $("#userName").val();
    var email = $("#email").val();
    var password = $("#password").val();
    var confirmpassword = $("#confirmPassword").val();
    if (
      user(username) == true &&
      emails(email) == true &&
      pass(password) == true &&
      confirmpasswords(confirmpassword) == true
    ) {
      $("#signup_form").submit();
    }
  }

  function user(username) {
    var usernameRegex = /^[a-zA-Z0-9]+$/;
    if (username.length < 3) {
      document.getElementById("userName").style.borderColor = "red";
      alert("Username cannot be less than 3 characters");
      return false;
    }
    if (usernameRegex.test(username) == false) {
      document.getElementById("userName").style.borderColor = "red";
      alert("Username must have alphanumeric characters only");
      return false;
    }
    document.getElementById("userName").style.borderColor = "initial";
    return true;
  }

  function emails(email) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (mailformat.test(email) == false) {
      document.getElementById("email").style.borderColor = "red";
      alert("Please enter a valid email address.");
      return false;
    }
    document.getElementById("email").style.borderColor = "initial";
    return true;
  }

  function pass(password) {
    var passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    if (passwordRegex.test(password) == false) {
      document.getElementById("password").style.borderColor = "red";
      alert("Please enter a valid password.");
      return false;
    }
    document.getElementById("password").style.borderColor = "initial";
    return true;
  }

  function confirmpasswords(confirmpassword) {
    var password = $("#password").val();

    if (confirmpassword !== password) {
      document.getElementById("confirmPassword").style.borderColor = "red";
      alert("Password doesn't match.");
      return false;
    } else {
      document.getElementById("confirmPassword").style.borderColor = "initial";
      return true;
    }
  }

  module.exports = signups = {
    user,
    emails,
    pass,
    confirmpasswords,
  };
});
