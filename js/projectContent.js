// Function to create and add an input element
function addInputElement(placeholder, required) {
    const inputElement = document.createElement('input');
    inputElement.type = 'text';
    inputElement.className = 'inputBox';
    inputElement.placeholder = placeholder;
    inputElement.required = required;
    return inputElement;
  }
  
  // Function to create and add a textarea element
  function addTextareaElement(placeholder, required) {
    const textareaElement = document.createElement('textarea');
    textareaElement.className = 'inputBox';
    textareaElement.placeholder = placeholder;
    textareaElement.required = required;
    return textareaElement;
  }
  
  // Function to create and add an uploaded element (image or audio)
  function addUploadedElement(accept, text) {
    const uploadedElement = document.createElement('div');
    uploadedElement.className = 'selectBox uploaded';
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.id = 'fileUpload';
    fileInput.name = 'fileUpload';
    fileInput.accept = accept;
    
    const label = document.createElement('label');
    label.htmlFor = 'fileUpload';
    label.className = 'imageUploadLabel';
    label.textContent = text;
    uploadedElement.appendChild(fileInput);
    uploadedElement.appendChild(label);
    return uploadedElement;
  }
  
  // Function to create and add an input text element for video embed
  function addVideoInputElement(placeholder) {
    const inputElement = document.createElement('input');
    inputElement.type = 'text';
    inputElement.className = 'inputBox';
    inputElement.placeholder = placeholder;
    return inputElement;
  }
  
  // Get the container element that holds the buttons
  const buttonContainer = document.querySelector('.dynamicForm');
  const elementLabelText = '';
  
  // Function to create a wrapper div with the added element
  function createWrapperDiv(element, elementType, elementLabelText) {
  
    const outerWrapperDiv = document.createElement('div');
    outerWrapperDiv.className = `outerElementWrapper`;
      
    const labelElement = document.createElement('label');
    labelElement.textContent = elementLabelText;
    labelElement.className = 'labelStyles';
    
    const closeButton = document.createElement('img');
    closeButton.src = 'img/AddProject/cross.svg';
    closeButton.className = 'closeButton';
    closeButton.addEventListener('click', () => {
      outerWrapperDiv.remove();
    });

    const labelAndCloseButtonSpan = document.createElement('span');
    labelAndCloseButtonSpan.className = 'labelAndCloseButtonSpan';
    labelAndCloseButtonSpan.appendChild(labelElement);
    labelAndCloseButtonSpan.appendChild(closeButton);
    
    const wrapperDiv = document.createElement('div');
    wrapperDiv.className = `elementWrapper ${elementType}`;
    wrapperDiv.appendChild(element);
  
    outerWrapperDiv.appendChild(labelAndCloseButtonSpan);
    outerWrapperDiv.appendChild(wrapperDiv);
    return outerWrapperDiv;
  }
  
  // Function to add a new element to the form
  function addElement(type) {
    const formElementsContainer = document.querySelector('.formElements');
  
    if (type === 'title') {
      formElementsContainer.appendChild(createWrapperDiv(addInputElement('Typ hier de titel van jouw alinea...', true), type, 'Titel'));
    } else if (type === 'paragraph') {
      formElementsContainer.appendChild(createWrapperDiv(addTextareaElement('Typ hier de tekst van jouw alinea...', true), type, 'Alinea'));
    } else if (type === 'image') {
      formElementsContainer.appendChild(createWrapperDiv(addUploadedElement('image/*', '+ Afbeelding'), type, 'Afbeelding'));
    } else if (type === 'video') {
      formElementsContainer.appendChild(createWrapperDiv(addVideoInputElement('Typ hier de youtube video code ...'), type, 'Video'));
    } else if (type === 'audio') {
      formElementsContainer.appendChild(createWrapperDiv(addUploadedElement('audio/*', '+ Audio'), type, 'Audio'));
    }
  }
  
  // Event listener for all buttons inside the container
  buttonContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('dynamicForm')) {
      const elementType = event.target.getAttribute('data-type');
      addElement(elementType);
    }
  });
  
  // Optional: Implement reordering and delete functionality using libraries like jQuery UI's Sortable or HTML5's Drag and Drop API.
  