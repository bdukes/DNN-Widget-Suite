/*
Facebook Widget
Widget Suite for DotNetNuke
Author - Mark Allan (http://www.dnngarden.com)
Project Contributors - Will Strohl (http://www.WillStrohl.com), Mark Allan (http://www.dnngarden.com), Armand Datema (http://www.schwingsoft.com)
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

* Neither the name of Will Strohl nor the names of its contributors may be used to endorse or 
promote products derived from this software without specific prior written permission.

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
''' This widget script adds Facebook plugins to the page.
''' </summary>
''' <version>01.00.00</version>
''' <remarks>
''' </remarks>
''' <history>
''' [markxa]  - 20110314 - Created
''' </history>
''' -----------------------------------------------------------------------------

EXAMPLE:
<object id="wgtFacebook" codetype="dotnetnuke/client" codebase="WillStrohl.Widgets.Facebook" declare="declare">
</object>

<object id="wgtFacebook" codetype="dotnetnuke/client" codebase="WillStrohl.Widgets.Facebook" declare="declare">
	<param name="plugin" value="like" />
	<param name="show_faces" value="true" />
	<param name="width" value="200" />
</object>
*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BEGIN: Facebook class                                                                                 //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// BEGIN: Namespace management
Type.registerNamespace("WillStrohl.Widgets");
// END: Namespace management

WillStrohl.Widgets.Facebook = function (widget) {
	WillStrohl.Widgets.Facebook.initializeBase(this, [widget]);
}

WillStrohl.Widgets.Facebook.prototype = {
	// BEGIN: render
	render: function () {
		var widget = this._widget;
		var widgetBase = $dnn.baseResourcesUrl + "Widgets/User/WillStrohl/";

		(function ($) {
			var $widget = $(widget);

			// Default parameters
			var plugin = "like";
			var params = {};

			// Parse parameters
			$widget.children("param").each(function () {
				if (this.name && this.value) {
					var paramName = this.name.toLowerCase().trim();
					var paramValue = this.value.trim();

					switch (paramName) {
						case "plugin":
							plugin = paramValue;
							break;
						default:
							params[paramName] = paramValue;
							break;
					}
				}
			});

			// Replace widget declaration with XFBML
			$(widget).replaceWith($("<fb:" + plugin + " />").attr(params));
		})(jQuery);
	}
	// END: render
}

WillStrohl.Widgets.Facebook.inheritsFrom(DotNetNuke.UI.WebControls.Widgets.BaseWidget);
WillStrohl.Widgets.Facebook.registerClass("WillStrohl.Widgets.Facebook", DotNetNuke.UI.WebControls.Widgets.BaseWidget);
DotNetNuke.UI.WebControls.Widgets.renderWidgetType("WillStrohl.Widgets.Facebook");

// Load Facebook script once all XFBML is instantiated
jQuery.getScript("http://connect.facebook.net/en_US/all.js#xfbml=1", function() {
	FB.init({status: true, cookie: true, xfbml  : true});
});
// END: Facebook class
