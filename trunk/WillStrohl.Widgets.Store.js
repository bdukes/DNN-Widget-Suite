/*
Store Widget
Widget Suite for DotNetNuke
Author - Armand Datema (http://www.schwingsoft.com)
Project Contributors - Armand Datema (http://www.schwingsoft.com), Mark Allan (http://www.dnngarden.com), Will Strohl (http://www.WillStrohl.com)
Support - http://dnnwidgets.codeplex.com
Copyright (c) 2011, Will Strohl
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted 
provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this list of conditions 
and the following disclaimer.

* Redistributions in binary form must reproduce the above copyright notice, this list of 
conditions and the following disclaimer in the documentation and/or other materials provided 
with the distribution.

* Neither the name of Widget Suite for DotNetNuke nor the names of its contributors may be used 
to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR 
IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY 
AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR 
CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL 
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, 
DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER 
IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT 
OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

''' -----------------------------------------------------------------------------
''' <summary>
''' This widget implements the ecwid.com store in your portal.
''' Pass it the wrapper item and it will put a complete working sore environment there.
''' </summary>
''' <version>01.00.00</version>
''' <remarks>
''' [01.00.00] this widget needs to have the following script added in the page header tags <script src="Resources/Widgets/User/WillStrohl/js/jquery.liveQuery.js" type="text/javascript"></script>
''' </remarks>
''' <history>
''' [Armand Datema] - 20110313 - Created
''' </history>
''' -----------------------------------------------------------------------------

EXAMPLE:
<object id="wgtecwid" codetype="dotnetnuke/client" codebase="WillStrohl.Widgets.ecwid" declare="declare">
</object>

<object id="wgtecwid" codetype="dotnetnuke/client" codebase="WillStrohl.Widgets.ecwid" declare="declare">
<param name="wrapper" value="#ecwidholder" />
<param name="StoreId" value="1003" />
<param name="catCount" value="3" />
<param name="prodRows" value="3" />
<param name="prodColumns" value="3" />
<param name="tableRows" value="10" />
<param name="listRows" value="10" />
<param name="categoryView" value="grid" />
<param name="searchView" value="list" />
</object>

*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BEGIN: ecwid class                                                                              //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// BEGIN: Namespace management
Type.registerNamespace("WillStrohl.Widgets");
// END: Namespace management

WillStrohl.Widgets.ecwid = function(widget) {
    WillStrohl.Widgets.ecwid.initializeBase(this, [widget]);
}

WillStrohl.Widgets.ecwid.prototype =
{
    // BEGIN: render
    render: function() {
        var widget = this._widget;

        (function($) {

            // Default parameters
            var wrapper = "#ecwidholder";
            var StoreId = 1003
            var catCount = 3;
            var prodRows = 3;
            var prodColumns = 3;
            var tableRows = 10;
            var listRows = 10;
            var categoryView = "grid";
            var searchView = "list";

            // Parse parameters
            $(widget).children().each(function() {
                if (this.name && this.value) {
                    var paramName = this.name.toLowerCase();
                    var paramValue = this.value;

                    switch (paramName) {
                        case "wrapper":
                            wrapper = paramValue;
                            break;
                        case "storeid":
                            StoreId = paramValue;
                            break;
                        case "catcount":
                            catCount = paramValue;
                            break;
                        case "prodrows":
                            prodRows = paramValue;
                            break;
                        case "prodcolumns":
                            prodColumns = paramValue;
                            break;
                        case "tablerows":
                            tableRows = paramValue;
                            break;
                        case "listrows":
                            listRows = paramValue;
                            break;
                        case "categoryview":
                            categoryView = paramValue;
                            break;
                        case "searchview":
                            searchView = paramValue;
                            break;
                    }
                }
            });

            // Get widget location
            var pageHost = document.location.host;

            // defer script for dom manipulation
            window.ecwid_script_defer = true;

            // Append a named holder to the wrapper
            jQuery("<div id='ecwid'></div>").appendTo(jQuery(wrapper));

            // Check if plugin is allready loaded
            if (typeof xAddWidget != 'undefined') {
                // Plugin allready loaded no need to load script just call the plugin
                xProductBrowser("categoriesPerRow=" + parseInt(catCount), "views=grid(" + parseInt(prodRows) + "," + parseInt(prodColumns) + ") list(" + parseInt(listRows) + ") table(" + parseInt(tableRows) + ")", "categoryView=" + categoryView, "searchView=" + searchView, "style=");
            } else {
                // Plugin not loaded so first load the plugin and then call it
                jQuery.getScript("http://app.ecwid.com/script.js?" + StoreId, function() {
                    xProductBrowser("categoriesPerRow=" + parseInt(catCount), "views=grid(" + parseInt(prodRows) + "," + parseInt(prodColumns) + ") list(" + parseInt(listRows) + ") table(" + parseInt(tableRows) + ")", "categoryView=" + categoryView, "searchView=" + searchView, "style=");
                    // delay the JavaScript loading a bit so the liveQuery plugin can pick up the change
                    setInterval(function() {
                        $('.ecwid').attr('works', 'ok');
                    }, 100);
                });
            }

            // Catch the ajax loaded html and add it to the appended holder
            $('.ecwid').livequery(function() {
                $(this).appendTo("#ecwid");
            });

            // Catch the popup layer and add it to the body instead of the holder 
            $('.ecwid-popup').livequery(function() {
                $(this).appendTo("body");
            });

        })(jQuery);
    }
    // END: render
}
WillStrohl.Widgets.ecwid.inheritsFrom(DotNetNuke.UI.WebControls.Widgets.BaseWidget);
WillStrohl.Widgets.ecwid.registerClass("WillStrohl.Widgets.ecwid", DotNetNuke.UI.WebControls.Widgets.BaseWidget);
DotNetNuke.UI.WebControls.Widgets.renderWidgetType("WillStrohl.Widgets.ecwid");
// END: ecwid class
