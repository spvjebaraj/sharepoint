$(document).ready(function() {
  $('.contact-entry').hide();
  SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function() {
    getItemsFromList('Contacts JSOM');
  });
});

var itemId = '';

function getItemsFromList(listTitle) {
  getListItems(listTitle)
    .done(function(response) {
      if (response !== null && response !== undefined) {
        // Clear the TBODY element
        $('#tblBody').empty();
        var listItemEnumerator = response.getEnumerator();

        while (listItemEnumerator.moveNext()) {
          var listItem = listItemEnumerator.get_current();
          var itemId = listItem.get_id();
          var firstName = listItem.get_item('FirstName');
          var lastName = listItem.get_item('Title');
          var email = listItem.get_item('Email');
          var company = listItem.get_item('Company');

          addRow(itemId, firstName, lastName, email, company);
        }
      }
    })
    .fail(function(error) {
      console.log(error);
    });
}

function addRow(itemId, firstName, lastName, email, company) {
  var tBody = document
    .getElementById('tblContacts')
    .getElementsByTagName('TBODY')[0];

  //Add Row
  row = tBody.insertRow(-1);

  //Add ID cell.
  var cell = row.insertCell(-1);
  cell.innerHTML = itemId;

  //Add First Name cell.
  var cell = row.insertCell(-1);
  cell.innerHTML = firstName;

  //Add Last Name cell.
  cell = row.insertCell(-1);
  cell.innerHTML = lastName;

  //Add Email cell.
  var cell = row.insertCell(-1);
  cell.innerHTML = email;

  //Add Company cell.
  var cell = row.insertCell(-1);
  cell.innerHTML = company;

  //Add Edit Button cell.
  cell = row.insertCell(-1);
  var btnEdit = document.createElement('BUTTON');
  btnEdit.type = 'button';
  btnEdit.innerText = 'Edit';
  btnEdit.className = 'btn btn-info btn-edit';
  btnEdit.setAttribute('onclick', 'onEdit(this)');
  cell.appendChild(btnEdit);

  //Add Delete Button cell.
  cell = row.insertCell(-1);
  var btnDelete = document.createElement('BUTTON');
  btnDelete.type = 'button';
  btnDelete.innerText = 'Delete';
  btnDelete.className = 'btn btn-danger btn-delete';
  btnDelete.setAttribute('onclick', 'onDelete(this)');
  cell.appendChild(btnDelete);
}

function getListItems(listTitle) {
  var dfd = $.Deferred();
  var context = SP.ClientContext.get_current();
  var web = context.get_web();
  var contactList = web.get_lists().getByTitle(listTitle);
  var camlQuery = new SP.CamlQuery();
  var query =
    "<View><Query><Where><Geq><FieldRef Name='ID'/>" +
    "<Value Type='Number'>1</Value></Geq></Where></Query><RowLimit>10</RowLimit></View>";
  camlQuery.set_viewXml(query);
  var listItems = contactList.getItems(camlQuery);
  context.load(listItems);

  context.executeQueryAsync(
    function() {
      dfd.resolve(listItems);
    },
    function(sender, args) {
      dfd.reject(args);
    }
  );
  return dfd.promise();
}

function addNewListItem() {
  $('.contact-entry').show();

  $("input[name='firstName']").val('');
  $("input[name='lastName']").val('');
  $("input[name='email']").val('');
  $("input[name='company']").val('');

  $('#btnSubmit').show();
  $('#btnUpdate').hide();
}

$('#btnSubmit').click(function() {
  addListItem('Contacts JSOM')
    .done(function(response) {
      if (response !== null && response !== undefined) {
        $('.contact-entry').hide();
        getItemsFromList('Contacts JSOM');
      }
    })
    .fail(function(error) {
      console.log(error);
    });
});

function addListItem(listTitle) {
  var firstName = $("input[name='firstName']").val();
  var lastName = $("input[name='lastName']").val();
  var email = $("input[name='email']").val();
  var company = $("input[name='company']").val();

  var dfd = $.Deferred();
  var context = SP.ClientContext.get_current();
  var contactList = context
    .get_web()
    .get_lists()
    .getByTitle(listTitle);
  var listItemCreationInformation = new SP.ListItemCreationInformation();
  var listItem = contactList.addItem(listItemCreationInformation);

  listItem.set_item('FirstName', firstName);
  listItem.set_item('Title', lastName);
  listItem.set_item('Email', email);
  listItem.set_item('Company', company);
  listItem.update();
  context.load(listItem);

  context.executeQueryAsync(
    function() {
      dfd.resolve(listItem);
    },
    function(sender, args) {
      dfd.reject(args);
    }
  );
  return dfd.promise();
}

function onEdit(currentRow) {
  var row = currentRow.parentNode.parentNode;
  itemId = row.getElementsByTagName('TD')[0].innerHTML;
  var firstName = row.getElementsByTagName('TD')[1].innerHTML;
  var lastName = row.getElementsByTagName('TD')[2].innerHTML;
  var email = row.getElementsByTagName('TD')[3].innerHTML;
  var company = row.getElementsByTagName('TD')[4].innerHTML;

  $("input[name='firstName']").val(firstName);
  $("input[name='lastName']").val(lastName);
  $("input[name='email']").val(email);
  $("input[name='company']").val(company);

  $('#btnSubmit').hide();
  $('#btnUpdate').show();
  $('.contact-entry').show();
}

$('#btnUpdate').click(function() {
  updateListItem('Contacts JSOM', itemId)
    .done(function(response) {
      if (response !== null && response !== undefined) {
        $('.contact-entry').hide();
        getItemsFromList('Contacts JSOM');
      }
    })
    .fail(function(error) {
      console.log(error);
    });
});

function updateListItem(listTitle, itemId) {
  var firstName = $("input[name='firstName']").val();
  var lastName = $("input[name='lastName']").val();
  var email = $("input[name='email']").val();
  var company = $("input[name='company']").val();

  var dfd = $.Deferred();
  var context = SP.ClientContext.get_current();
  var contactList = context
    .get_web()
    .get_lists()
    .getByTitle(listTitle);
  var listItem = contactList.getItemById(itemId);

  listItem.set_item('FirstName', firstName);
  listItem.set_item('Title', lastName);
  listItem.set_item('Email', email);
  listItem.set_item('Company', company);
  listItem.update();
  context.load(listItem);

  context.executeQueryAsync(
    function() {
      dfd.resolve(listItem);
    },
    function(sender, args) {
      dfd.reject(args);
    }
  );
  return dfd.promise();
}

function onDelete(currentRow) {
  var row = currentRow.parentNode.parentNode;
  var itemId = row.getElementsByTagName('TD')[0].innerHTML;

  deleteListItem('Contacts JSOM', itemId)
    .done(function(response) {
      if (response !== null && response !== undefined) {
        $('.contact-entry').hide();
        getItemsFromList('Contacts JSOM');
      }
    })
    .fail(function(error) {
      console.log(error);
    });
}

function deleteListItem(listTitle, itemId) {
  var dfd = $.Deferred();
  var context = SP.ClientContext.get_current();
  var contactList = context
    .get_web()
    .get_lists()
    .getByTitle(listTitle);
  var listItem = contactList.getItemById(itemId);

  listItem.deleteObject();
  context.executeQueryAsync(
    function() {
      dfd.resolve(listItem);
    },
    function(sender, args) {
      dfd.reject(args);
    }
  );
  return dfd.promise();
}

function onCancel() {
  $('.contact-entry').hide();
}
