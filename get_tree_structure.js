/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function listFolderContents() {
  var foldername = 'demo';
  var folderlisting = 'Listing of folder ' + foldername;
  
  var folders = DriveApp.getFoldersByName(foldername);
  var folder = folders.next();
  var fid = folder.getId();
  Logger.log(fid);
  var contents = folder.getFiles();
  
  //var ss = SpreadsheetApp.create(folderlisting);
  
  var sheet = SpreadsheetApp.getActiveSheet();
  sheet.clear();
  sheet.appendRow( ['id', 'name', 'link', 'created_date', 'description', 'editors','viewers', 'owner', 'parent', 'sharing_access', 'sharing_permission'] );
  
  var file;
  var name;
  var link;
  var row;
  while(contents.hasNext()) {
    file = contents.next();
    var id = file.getId();
    name = file.getName();
    link = file.getUrl();
    var datenew = file.getDateCreated();
    var des = file.getDescription();
    var editors = file.getEditors().map(function(e){return [e.getEmail(), e.getName()]}).join(",");
    var viewers = file.getViewers().map(function(e){return [e.getEmail(), e.getName()]}).join(",");
    var owner = file.getOwner().getEmail();
    var parent = file.getParents().next().getName();
    var sharingaccess = file.getSharingAccess();
    var sharingpermission = file.getSharingPermission();
    sheet.appendRow( [id, name, link, datenew, des ,editors, viewers, owner, parent, sharingaccess, sharingpermission] );     
  }  
};

