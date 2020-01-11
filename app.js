//Дэлгэцтэй ажиллах контроллер
var uiController = (function() {})();

//Санхүүтэй ажиллах контроллер
var financeController = (function() {})();

//Програмын холбогч контроллер
var appController = (function(uiController, financeController) {
  var ctrlAddItem = function() {
    //1. Оруулах өгөгдлийг дэлгэцээс олж авна
    console.log("Дэлгэцээс өгөгдөл авах хэсэг");
  };
  document.querySelector(".add__btn").addEventListener("click", function() {
    ctrlAddItem();
    //2. Олж авсан өгөгдлүүдээ санхүүгийн контроллерт дамжуулж тэнд хадгална.

    //3. Олж авсан өгөгдлүүдээ Вэб дээр тохирох хэсэгт харуулна.

    //4. Төсөвийг тооцоолно.

    //5. Эцсийн үлдэгдэл, тооцоог дэлгэцэнд гаргана.
  });
  document.addEventListener("keypress", function(event) {
    //event.which нь дээр үеийн броүсер үед ажиллана.
    if (event.keyCode === 13 || event.which === 13) {
      ctrlAddItem();
    } else console.log(event.keyCode + " кодтой товчыг дарсан");
  });
})(uiController, financeController);
