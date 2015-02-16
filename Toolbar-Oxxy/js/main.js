function Toolbar(options) {

    options = options || {};

    this._toolbar = document.createElement('div');
    this._label = document.createElement('h3');
    this._label.innerHTML = options.label;
    this._toolbar.className = options.toolbarContainerClass;

    this._btnContainer = document.createElement('div');
    this._btnContainer.className = options.btnContainer;


    this._linkButton = document.createElement('div');
    this._linkButton.className = options.buttons;
    this._linkButton.innerHTML = 'Create Button';
    this._textButton = document.createElement('div');
    this._textButton.className = options.buttons;
    this._textButton.innerHTML = 'Create Text';

    this._btnContainer.appendChild(this._linkButton);
    this._btnContainer.appendChild(this._textButton);

    this._toolbar.appendChild(this._label);
    this._toolbar.appendChild(this._btnContainer);
}


Toolbar.prototype = {
    init: function () {
        var self = this;

        var txtOptions = {
            color: '0000ff',
            containerClass: 'create-text-class',
            text: 'Yooo text',
            txtOptions: document.body
        };

        var btnOptions = {
            color: '0000ff',
            href: 'http://www.google.com',
            containerClass: 'create-button-class',
            aTagClass: 'create-text-class',
            btnParent: document.body
        };

        this.render(document.body);


        this._linkButton.onclick = function () {
            self.craeteButton(btnOptions);
        };

        this._textButton.onclick = function () {
            self.createText(txtOptions);
        }

        $(this._toolbar).draggable();
    },
    render: function (parent) {
        parent.appendChild(this._toolbar)
    },
    craeteButton: function (options) {
        var button = new Button(options);
        button.render(options.btnParent);
    },
    createText: function (options) {
        var text = new Text(options);
        text.render(options.txtOptions);
    }
};

function Element() {

    $(this._container).on('dblclick', function(e) {
        e.preventDefault();
        colorPicker(e);
    });
console.log(this._container);
    $(this._container).draggable();

}
Element.prototype = {
    render: function (parent) {
        parent.appendChild(this._container);
    },

    setBackground: function (color) {
        this._container.style.backgroundColor = this._backgroundColor = color;
    },
    getBackground: function () {
        return this._backgroundColor;
    }
};

function Button(options) {
    options = options || {};
    options.color = options.color || '#ff0000';
    options.href = options.href || '#';

    this._backgroundColor = options.color;
    this._container = document.createElement('div');
    this._aTag = document.createElement('a');
    this._aTag.innerHTML = options.href.split('/')[2];
    this._aTag.href = options.href;
    this._aTag.target = '_blank';
    this._container.className = options.containerClass;
    this._container.appendChild((this._aTag));

    Element.call(this, Array.prototype.slice.call(arguments));
}

Button.prototype = Object.create(Element.prototype);

Button.prototype.constructor = Button;


function Text(options) {
    options = options || {};
    options.color = options.color || '#ff0000';
    options.href = options.href || '#';

    this._backgroundColor = options.color;
    this._container = document.createElement('div');
    this._container.innerHTML = options.text;
    this._container.className = options.containerClass;

    Element.call(this, Array.prototype.slice.call(arguments));
}

Text.prototype = Object.create(Element.prototype);
Text.prototype.constructor = Text;


$(function() {
    var toolbarOptions = {
        label: 'Toolbar',
        href: 'http://www.google.com',
        toolbarContainerClass: 'toolbar-container',
        btnContainer: 'btn-container',
        buttons: 'buttons'
    };

    var toolbar = new Toolbar(toolbarOptions);

    toolbar.init();
})

