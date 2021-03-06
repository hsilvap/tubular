var assert = require("assert");
var tubulargen = require("../dist/node-module.js");
var genFields = '\r\n\t<tb-numeric-editor name=\"Id\"\r\n\t\tlabel=\"Id\" show-label=\"true\"\r\n\t\tplaceholder=\"\"\r\n\t\trequired=\"true\"\r\n\t\tread-only=\"false\"\r\n\t\tformat=\"\"\r\n\t\thelp=\"\"\u003e\r\n\t\u003c/tb-numeric-editor\u003e\r\n\t\u003ctb-simple-editor name=\"Name\"\r\n\t\teditor-type=\"string\" \r\n\t\tlabel=\"Name\" show-label=\"true\"\r\n\t\tplaceholder=\"\"\r\n\t\trequired=\"true\"\r\n\t\tread-only=\"false\"\r\n\t\thelp=\"\"\u003e\r\n\t\u003c/tb-simple-editor\u003e\r\n\t\u003ctb-simple-editor name=\"Company\"\r\n\t\teditor-type=\"string\" \r\n\t\tlabel=\"Company\" show-label=\"true\"\r\n\t\tplaceholder=\"\"\r\n\t\trequired=\"true\"\r\n\t\tread-only=\"false\"\r\n\t\thelp=\"\"\u003e\r\n\t\u003c/tb-simple-editor\u003e\r\n\t\u003ctb-simple-editor name=\"Email\"\r\n\t\teditor-type=\"string\" \r\n\t\tlabel=\"Email\" show-label=\"true\"\r\n\t\tplaceholder=\"\"\r\n\t\trequired=\"true\"\r\n\t\tread-only=\"false\"\r\n\t\thelp=\"\"\u003e\r\n\t\u003c/tb-simple-editor\u003e\r\n\t\u003ctb-simple-editor name=\"Phone\"\r\n\t\teditor-type=\"string\" \r\n\t\tlabel=\"Phone\" show-label=\"true\"\r\n\t\tplaceholder=\"\"\r\n\t\trequired=\"true\"\r\n\t\tread-only=\"false\"\r\n\t\thelp=\"\"\u003e\r\n\t\u003c/tb-simple-editor\u003e\r\n\t\u003ctb-date-time-editor name=\"Birthday\"\r\n\t\tlabel=\"Birthday\" show-label=\"true\"\r\n\t\trequired=\"true\"\r\n\t\tread-only=\"false\"\r\n\t\tformat=\"\"\r\n\t\thelp=\"\"\u003e\r\n\t\u003c/tb-date-time-editor\u003e\r\n\t\u003ctb-checkbox-field name=\"IsOwner\"\r\n\t\tread-only=\"false\"\r\n\t\thelp=\"\"\u003e\r\n\t</tb-checkbox-field>';
var genCells = "\r\n\t\t<tb-cell-template column-name=\"Id\">\r\n\t\t\t<tb-numeric-editor is-editing=\"row.$isEditing\" value=\"row.Id\"></tb-numeric-editor>\r\n\t\t</tb-cell-template>\r\n\t\t<tb-cell-template column-name=\"Name\">\r\n\t\t\t<tb-simple-editor is-editing=\"row.$isEditing\" value=\"row.Name\"></tb-simple-editor>\r\n\t\t</tb-cell-template>\r\n\t\t<tb-cell-template column-name=\"Company\">\r\n\t\t\t<tb-simple-editor is-editing=\"row.$isEditing\" value=\"row.Company\"></tb-simple-editor>\r\n\t\t</tb-cell-template>\r\n\t\t<tb-cell-template column-name=\"Email\">\r\n\t\t\t<tb-simple-editor is-editing=\"row.$isEditing\" value=\"row.Email\"></tb-simple-editor>\r\n\t\t</tb-cell-template>\r\n\t\t<tb-cell-template column-name=\"Phone\">\r\n\t\t\t<tb-simple-editor is-editing=\"row.$isEditing\" value=\"row.Phone\"></tb-simple-editor>\r\n\t\t</tb-cell-template>\r\n\t\t<tb-cell-template column-name=\"Birthday\">\r\n\t\t\t<tb-date-time-editor is-editing=\"row.$isEditing\" value=\"row.Birthday\"></tb-date-time-editor>\r\n\t\t</tb-cell-template>\r\n\t\t<tb-cell-template column-name=\"IsOwner\">\r\n\t\t\t<tb-checkbox-field is-editing=\"row.$isEditing\" value=\"row.IsOwner\"></tb-checkbox-field>\r\n\t\t</tb-cell-template>";

describe('tubularTemplateServiceModule', function () {
    var models = require("./models");
    var columns = tubulargen.createColumns(models);

    describe('#createColumns()', function () {
        it('should return an array with 7 elements', function () {
            assert.notEqual(columns, []);
            assert.equal(columns.length, 7);
        });

        it('first element should match', function() {
            var first = require('./firstcolumn');
            assert.deepEqual(columns[0], first);
        });
    });

    describe('#generateFieldsArray()', function () {
        var fields = tubulargen.generateFieldsArray(columns);

        it('should return an array with 7 elements', function () {
            assert.notEqual(fields, []);
            assert.equal(fields.length, 7);
        });

        it('first element should match', function() {
            var expectedString = '\r\n\t<tb-numeric-editor name="Id"\r\n\t\tlabel="Id" show-label="true"\r\n\t\tplaceholder=""\r\n\t\trequired="true"\r\n\t\tread-only="false"\r\n\t\tformat=""\r\n\t\thelp="">\r\n\t</tb-numeric-editor>';
            assert.equal(fields[0], expectedString);
        });
    });

    describe('#generateFields()', function () {
        var htmlOutput = tubulargen.generateFields(columns);
        
        it('should html match', function () {
            assert.equal(htmlOutput, genFields);
        });
    });

    describe('#generatePopup()', function () {
        var htmlOutput = tubulargen.generatePopup(models, "TEST");

        it('should html match', function () {
            var expectedString = '<tb-form model="Model">' +
            '<div class="modal-header"><h3 class="modal-title">TEST</h3></div>' +
            '<div class="modal-body">' + genFields + '</div>' +
            '<div class="modal-footer">' +
            '<button class="btn btn-primary" ng-click="savePopup()" ng-disabled="!Model.$valid()">Save</button>' +
            '<button class="btn btn-danger" ng-click="closePopup()" formnovalidate>Cancel</button>' +
            '</div>' +
            '</tb-form>';

            assert.equal(htmlOutput, expectedString);
        });
    });

    describe('#getEditorTypeByDateType()', function() {
        it('should be tbDateTimeEditor', function () {
            assert.equal('tbDateTimeEditor', tubulargen.getEditorTypeByDateType('date'));
        });

        it('should be tbNumericEditor', function () {
            assert.equal('tbNumericEditor', tubulargen.getEditorTypeByDateType('numeric'));
        });

        it('should be tbCheckboxField', function () {
            assert.equal('tbCheckboxField', tubulargen.getEditorTypeByDateType('boolean'));
        });

        it('should be tbSimpleEditor', function () {
            assert.equal('tbSimpleEditor', tubulargen.getEditorTypeByDateType(''));
        });
    });

    describe('#generateForm()', function() {
        var htmlOutput = tubulargen.generateForm(columns, tubulargen.defaults.formOptions);

        it('should single layout html match', function () {
            var expectedString = '<tb-form server-save-method=\"POST\" model-key=\"\" require-authentication=\"false\" server-url=\"\" server-save-url=\"\">\r\n\t' + genFields + '\r\n\t<div>\r\n\t\t<button class=\"btn btn-primary\" ng-click=\"$parent.save()\" ng-disabled=\"!$parent.model.$valid()\">Save</button>\r\n\t\t<button class=\"btn btn-danger\" ng-click=\"$parent.cancel()\" formnovalidate>Cancel</button>\r\n\t</div>\r\n</tb-form>';
            assert.equal(htmlOutput, expectedString);
        });

        var options = tubulargen.defaults.formOptions;
        options.Layout = 'Two-columns';
        var htmlOutputTwoCol = tubulargen.generateForm(columns, options);

        it('should two columns layout html match', function () {
            var expectedString = "<tb-form server-save-method=\"POST\" model-key=\"\" require-authentication=\"false\" server-url=\"\" server-save-url=\"\">\r\n\t\r\n\t<div class='row'>\r\n\t<div class='col-md-6'>\r\n\t<tb-numeric-editor name=\"Id\"\r\n\t\tlabel=\"Id\" show-label=\"true\"\r\n\t\tplaceholder=\"\"\r\n\t\trequired=\"true\"\r\n\t\tread-only=\"false\"\r\n\t\tformat=\"\"\r\n\t\thelp=\"\">\r\n\t</tb-numeric-editor>\r\n\t<tb-simple-editor name=\"Company\"\r\n\t\teditor-type=\"string\" \r\n\t\tlabel=\"Company\" show-label=\"true\"\r\n\t\tplaceholder=\"\"\r\n\t\trequired=\"true\"\r\n\t\tread-only=\"false\"\r\n\t\thelp=\"\">\r\n\t</tb-simple-editor>\r\n\t<tb-simple-editor name=\"Phone\"\r\n\t\teditor-type=\"string\" \r\n\t\tlabel=\"Phone\" show-label=\"true\"\r\n\t\tplaceholder=\"\"\r\n\t\trequired=\"true\"\r\n\t\tread-only=\"false\"\r\n\t\thelp=\"\">\r\n\t</tb-simple-editor>\r\n\t<tb-checkbox-field name=\"IsOwner\"\r\n\t\tread-only=\"false\"\r\n\t\thelp=\"\">\r\n\t</tb-checkbox-field>\r\n\t</div>\r\n\t<div class='col-md-6'>\r\n\t<tb-simple-editor name=\"Name\"\r\n\t\teditor-type=\"string\" \r\n\t\tlabel=\"Name\" show-label=\"true\"\r\n\t\tplaceholder=\"\"\r\n\t\trequired=\"true\"\r\n\t\tread-only=\"false\"\r\n\t\thelp=\"\">\r\n\t</tb-simple-editor>\r\n\t<tb-simple-editor name=\"Email\"\r\n\t\teditor-type=\"string\" \r\n\t\tlabel=\"Email\" show-label=\"true\"\r\n\t\tplaceholder=\"\"\r\n\t\trequired=\"true\"\r\n\t\tread-only=\"false\"\r\n\t\thelp=\"\">\r\n\t</tb-simple-editor>\r\n\t<tb-date-time-editor name=\"Birthday\"\r\n\t\tlabel=\"Birthday\" show-label=\"true\"\r\n\t\trequired=\"true\"\r\n\t\tread-only=\"false\"\r\n\t\tformat=\"\"\r\n\t\thelp=\"\">\r\n\t</tb-date-time-editor></div>\r\n\t</div>\r\n\t<div>\r\n\t\t<button class=\"btn btn-primary\" ng-click=\"$parent.save()\" ng-disabled=\"!$parent.model.$valid()\">Save</button>\r\n\t\t<button class=\"btn btn-danger\" ng-click=\"$parent.cancel()\" formnovalidate>Cancel</button>\r\n\t</div>\r\n</tb-form>";
            assert.equal(htmlOutputTwoCol, expectedString);
        });

        options.Layout = 'Three-columns';
        var htmlOutputThreeCol = tubulargen.generateForm(columns, options);

        it('should three columns layout html match', function () {
            var expectedString = "<tb-form server-save-method=\"POST\" model-key=\"\" require-authentication=\"false\" server-url=\"\" server-save-url=\"\">\r\n\t\r\n\t<div class='row'>\r\n\t<div class='col-md-4'>\r\n\t<tb-numeric-editor name=\"Id\"\r\n\t\tlabel=\"Id\" show-label=\"true\"\r\n\t\tplaceholder=\"\"\r\n\t\trequired=\"true\"\r\n\t\tread-only=\"false\"\r\n\t\tformat=\"\"\r\n\t\thelp=\"\">\r\n\t</tb-numeric-editor>\r\n\t<tb-simple-editor name=\"Email\"\r\n\t\teditor-type=\"string\" \r\n\t\tlabel=\"Email\" show-label=\"true\"\r\n\t\tplaceholder=\"\"\r\n\t\trequired=\"true\"\r\n\t\tread-only=\"false\"\r\n\t\thelp=\"\">\r\n\t</tb-simple-editor>\r\n\t<tb-checkbox-field name=\"IsOwner\"\r\n\t\tread-only=\"false\"\r\n\t\thelp=\"\">\r\n\t</tb-checkbox-field>\r\n\t</div>\r\n\t<div class='col-md-4'>\r\n\t<tb-simple-editor name=\"Name\"\r\n\t\teditor-type=\"string\" \r\n\t\tlabel=\"Name\" show-label=\"true\"\r\n\t\tplaceholder=\"\"\r\n\t\trequired=\"true\"\r\n\t\tread-only=\"false\"\r\n\t\thelp=\"\">\r\n\t</tb-simple-editor>\r\n\t<tb-simple-editor name=\"Phone\"\r\n\t\teditor-type=\"string\" \r\n\t\tlabel=\"Phone\" show-label=\"true\"\r\n\t\tplaceholder=\"\"\r\n\t\trequired=\"true\"\r\n\t\tread-only=\"false\"\r\n\t\thelp=\"\">\r\n\t</tb-simple-editor>\r\n\t</div>\r\n\t<div class='col-md-4'>\r\n\t<tb-simple-editor name=\"Company\"\r\n\t\teditor-type=\"string\" \r\n\t\tlabel=\"Company\" show-label=\"true\"\r\n\t\tplaceholder=\"\"\r\n\t\trequired=\"true\"\r\n\t\tread-only=\"false\"\r\n\t\thelp=\"\">\r\n\t</tb-simple-editor>\r\n\t<tb-date-time-editor name=\"Birthday\"\r\n\t\tlabel=\"Birthday\" show-label=\"true\"\r\n\t\trequired=\"true\"\r\n\t\tread-only=\"false\"\r\n\t\tformat=\"\"\r\n\t\thelp=\"\">\r\n\t</tb-date-time-editor>\r\n\t</div>\r\n\t</div>\r\n\t<div>\r\n\t\t<button class=\"btn btn-primary\" ng-click=\"$parent.save()\" ng-disabled=\"!$parent.model.$valid()\">Save</button>\r\n\t\t<button class=\"btn btn-danger\" ng-click=\"$parent.cancel()\" formnovalidate>Cancel</button>\r\n\t</div>\r\n</tb-form>";
            assert.equal(htmlOutputThreeCol, expectedString);
        });
    });


    describe('#generateCells()', function () {
        var htmlOutput = tubulargen.generateCells(columns, 'Inline');
        
        it('should html match', function () {
            assert.equal(htmlOutput, genCells);
        });
    });

    describe('#generateGrid()', function () {
        var htmlOutput = tubulargen.generateGrid(columns, tubulargen.defaults.gridOptions);
        
        it('should html match', function () {
            var expectedString = "<div class=\"container\">\r\n<tb-grid server-url=\"undefined\" request-method=\"GET\" class=\"row\" page-size=\"10\" require-authentication=\"false\" >\r\n\t<div class=\"row\">\r\n\t<tb-grid-pager class=\"col-md-6\"></tb-grid-pager>\r\n\t<div class=\"col-md-3\">\r\n\t\t<div class=\"btn-group\">\r\n\t\t<tb-print-button title=\"Tubular\" class=\"btn-sm\"></tb-print-button>\r\n\t\t<tb-export-button filename=\"tubular.csv\" css=\"btn-sm\"></tb-export-button>\r\n\t\t</div>\r\n\t</div>\r\n\t<tb-text-search class=\"col-md-3\" css=\"input-sm\"></tb-text-search>\r\n\t</div>\r\n\t<div class=\"row\">\r\n\t<div class=\"col-md-12\">\r\n\t<div class=\"panel panel-default panel-rounded\">\r\n\t<tb-grid-table class=\"table-bordered\">\r\n\t<tb-column-definitions>\r\n\t\t<tb-column name=\"Id\" label=\"Id\" column-type=\"numeric\" sortable=\"true\" \r\n\t\t\tis-key=\"true\" searchable=\"false\" \r\n\t\t\tsort-direction=\"Ascending\" sort-order=\"1\" visible=\"true\">\r\n\t\t\t<tb-column-filter></tb-column-filter>\r\n\t\t\t<tb-column-header>{{label}}</tb-column-header>\r\n\t\t</tb-column>\r\n\t\t<tb-column name=\"Name\" label=\"Name\" column-type=\"string\" sortable=\"true\" \r\n\t\t\tis-key=\"false\" searchable=\"true\" \r\n\t\t\tsort-direction=\"\" sort-order=\"0\" visible=\"true\">\r\n\t\t\t<tb-column-filter></tb-column-filter>\r\n\t\t\t<tb-column-header>{{label}}</tb-column-header>\r\n\t\t</tb-column>\r\n\t\t<tb-column name=\"Company\" label=\"Company\" column-type=\"string\" sortable=\"true\" \r\n\t\t\tis-key=\"false\" searchable=\"true\" \r\n\t\t\tsort-direction=\"\" sort-order=\"0\" visible=\"true\">\r\n\t\t\t<tb-column-filter></tb-column-filter>\r\n\t\t\t<tb-column-header>{{label}}</tb-column-header>\r\n\t\t</tb-column>\r\n\t\t<tb-column name=\"Email\" label=\"Email\" column-type=\"string\" sortable=\"true\" \r\n\t\t\tis-key=\"false\" searchable=\"true\" \r\n\t\t\tsort-direction=\"\" sort-order=\"0\" visible=\"true\">\r\n\t\t\t<tb-column-filter></tb-column-filter>\r\n\t\t\t<tb-column-header>{{label}}</tb-column-header>\r\n\t\t</tb-column>\r\n\t\t<tb-column name=\"Phone\" label=\"Phone\" column-type=\"string\" sortable=\"true\" \r\n\t\t\tis-key=\"false\" searchable=\"true\" \r\n\t\t\tsort-direction=\"\" sort-order=\"0\" visible=\"true\">\r\n\t\t\t<tb-column-filter></tb-column-filter>\r\n\t\t\t<tb-column-header>{{label}}</tb-column-header>\r\n\t\t</tb-column>\r\n\t\t<tb-column name=\"Birthday\" label=\"Birthday\" column-type=\"date\" sortable=\"true\" \r\n\t\t\tis-key=\"false\" searchable=\"false\" \r\n\t\t\tsort-direction=\"\" sort-order=\"0\" visible=\"true\">\r\n\t\t\t<tb-column-filter></tb-column-filter>\r\n\t\t\t<tb-column-header>{{label}}</tb-column-header>\r\n\t\t</tb-column>\r\n\t\t<tb-column name=\"IsOwner\" label=\"Is Owner\" column-type=\"boolean\" sortable=\"true\" \r\n\t\t\tis-key=\"false\" searchable=\"false\" \r\n\t\t\tsort-direction=\"\" sort-order=\"0\" visible=\"true\">\r\n\t\t\t<tb-column-filter></tb-column-filter>\r\n\t\t\t<tb-column-header>{{label}}</tb-column-header>\r\n\t\t</tb-column>\r\n\t</tb-column-definitions>\r\n\t<tb-row-set>\r\n\t<tb-row-template ng-repeat=\"row in $component.rows\" row-model=\"row\">\r\n\t\t<tb-cell-template column-name=\"Id\">\r\n\t\t\t{{row.Id | number}}\r\n\t\t</tb-cell-template>\r\n\t\t<tb-cell-template column-name=\"Name\">\r\n\t\t\t{{row.Name}}\r\n\t\t</tb-cell-template>\r\n\t\t<tb-cell-template column-name=\"Company\">\r\n\t\t\t{{row.Company}}\r\n\t\t</tb-cell-template>\r\n\t\t<tb-cell-template column-name=\"Email\">\r\n\t\t\t<a href=\"mailto:{{row.Email}}\">{{row.Email}}</a>\r\n\t\t</tb-cell-template>\r\n\t\t<tb-cell-template column-name=\"Phone\">\r\n\t\t\t{{row.Phone}}\r\n\t\t</tb-cell-template>\r\n\t\t<tb-cell-template column-name=\"Birthday\">\r\n\t\t\t{{row.Birthday | date}}\r\n\t\t</tb-cell-template>\r\n\t\t<tb-cell-template column-name=\"IsOwner\">\r\n\t\t\t{{row.IsOwner ? \"TRUE\" : \"FALSE\" }}\r\n\t\t</tb-cell-template>\r\n\t</tb-row-template>\r\n\t</tb-row-set>\r\n\t</tb-grid-table>\r\n\t</div>\r\n\t</div>\r\n\t</div>\r\n\t<div class=\"row\">\r\n\t<tb-grid-pager class=\"col-md-6\"></tb-grid-pager>\r\n\t<tb-page-size-selector class=\"col-md-3\" selectorcss=\"input-sm\"></tb-page-size-selector>\r\n\t<tb-grid-pager-info class=\"col-md-3\"></tb-grid-pager-info>\r\n\t</div>\r\n</tb-grid>\r\n</div>";
            assert.equal(htmlOutput, expectedString);
        });
    });
});