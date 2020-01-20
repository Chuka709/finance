//Дэлгэцтэй ажиллах контроллер
var uiController = (function() {
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    addButton: ".add__btn"
  };
  //Доорх public service-үүдээс бусад контроллерууд дуудаж ажиллана.
  return {
    getInput: function() {
      return {
        type: document.querySelector(DOMstrings.inputType).value, //exp or inc
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
      };
    },
    getDOMstrings: function() {
      return DOMstrings;
    },

    addListItem: function(item, type) {
      //Орлого зарлагын элементийг агуулсан html-г бэлтгэнэ.
      var html, list;
      if (type === "inc") {
        list = ".income__list";
        html =
          '<div class="item clearfix" id="income-%id%"><div class="item__description">$$description$$</div><div class="right clearfix"><div class="item__value">$$value$$</div><div class="item__delete"><button class="item__delete__btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else {
        list = ".expenses__list";
        html =
          '<div class="item clearfix" id="expense-%id%"><div class="item__description">$$description$$</div><div class="right clearfix"><div class="item__value">$$value$$</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete__btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }
      //Тэр HTML дотороо орлого зарлагын утгуудыг REPLACE ашиглаж өөрчилж өгнө
      html = html.replace("%id%", item.id);
      html = html.replace("$$description$$", item.description);
      html = html.replace("$$value$$", item.value);
      //Бэлтгэсэн HTML-ээ DOM-руу хийж өгнө.
      document.querySelector(list).insertAdjacentHTML("beforeend", html);
    }
  };
})();

//Санхүүтэй ажиллах контроллер
var financeController = (function() {
  //private function
  var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  //private data
  var data = {
    items: {
      inc: [],
      exp: []
    },
    totals: {
      inc: 0,
      exp: 0
    }
  };
  return {
    addItem: function(type, desc, val) {
      var item,
        id = 1;
      //id
      if (data.items[type].length === 0) {
        id = 1;
      } else {
        id = data.items[type][data.items[type].length - 1].id + 1;
      }
      if (type === "inc") {
        item = new Income(id, desc, val);
      } else {
        item = new Expense(id, desc, val);
      }
      data.items[type].push(item);
      return item;
    },
    seeData: function() {
      return data;
    }
  };
})();

//Програмын холбогч контроллер
var appController = (function(uiController, financeController) {
  var ctrlAddItem = function() {
    //1. Оруулах өгөгдлийг дэлгэцээс олж авна
    var input = uiController.getInput();
    //2. Олж авсан өгөгдлүүдээ санхүүгийн контроллерт дамжуулж тэнд хадгална.
    var item = financeController.addItem(
      input.type,
      input.description,
      input.value
    );

    //3. Олж авсан өгөгдлүүдээ Вэб дээр тохирох хэсэгт харуулна.
    uiController.addListItem(item, input.type);
    //4. Төсөвийг тооцоолно.
    //5. Эцсийн үлдэгдэл, тооцоог дэлгэцэнд гаргана.
  };
  var setupEventListeners = function() {
    var DOM = uiController.getDOMstrings();
    document.querySelector(DOM.addButton).addEventListener("click", function() {
      ctrlAddItem();
    });
    document.addEventListener("keypress", function(event) {
      //event.which нь дээр үеийн броүсер үед ажиллана.
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
  };
  return {
    init: function() {
      console.log("App started...");
      setupEventListeners();
    }
  };
})(uiController, financeController);

appController.init();
