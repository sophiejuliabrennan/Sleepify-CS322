$(document).ready(function () {
  $("#signup_submit_btn").on("click", (e) => {
    $("#signup_form").submit();
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

  // function validate() {
  //   var username = $("#userName").val();
  //   var email = $("#email").val();
  //   var password = $("#password").val();
  //   var confirmpassword = $("#confirmPassword").val();

  //   if (username.length < 3) {
  //     username.css("border-color", "red");
  //   } else {
  //     username.css("border-color", "initial");
  //   }
  // }
});
