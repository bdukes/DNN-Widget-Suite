/*
Will Strohl - http://www.WillStrohl.com
Support - http://dnnwidgets.codeplex.com
Copyright (c) 2010, Will Strohl
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
''' This widget script allows you to change the location that your icons are referenced in your skin.
''' </summary>
''' <version>01.00.00</version>
''' <remarks>
''' </remarks>
''' <history>
''' [wstrohl] - 20101203 - Created
''' </history>
''' -----------------------------------------------------------------------------

EXAMPLE:
<object id="wgtIconSwitcher" codetype="dotnetnuke/client" codebase="WillStrohl.Widgets.IconSwitcher" declare="declare">
</object>

<object id="wgtIconSwitcher" codetype="dotnetnuke/client" codebase="WillStrohl.Widgets.IconSwitcher" declare="declare">
	<param name="iconPath" value="/Portals/0/Skins/SkinName/" />
</object>
*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BEGIN: IconSwitcher class                                                                              //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// BEGIN: Namespace management
Type.registerNamespace("WillStrohl.Widgets");
// END: Namespace management

WillStrohl.Widgets.IconSwitcher = function(widget)
{
	WillStrohl.Widgets.IconSwitcher.initializeBase(this, [widget]);
}

WillStrohl.Widgets.IconSwitcher.prototype =
{
    // BEGIN: render
    render: function () {
        var widget = this._widget;

        (function ($) {
            // Default parameters
            var iconPath = '';

            // Parse parameters
            $(widget).children().each(function () {
                if (this.name && this.value) {
                    var paramName = this.name.toLowerCase();
                    var paramValue = this.value;

                    switch (paramName) {
                        case 'iconpath':
                            cssClass = paramValue;
                            break;
                    }
                }
            });

            if (iconPath != '') { 
                // check for preceding slash
                // check for trailing slash
                // get a collection of all images that refer to the /images/* directory
                // replace the /images/ directory with the one in the param
            }

        })(jQuery);
    }
    // END: render
}

WillStrohl.Widgets.IconSwitcher.inheritsFrom(DotNetNuke.UI.WebControls.Widgets.BaseWidget);
WillStrohl.Widgets.IconSwitcher.registerClass("WillStrohl.Widgets.IconSwitcher", DotNetNuke.UI.WebControls.Widgets.BaseWidget);
DotNetNuke.UI.WebControls.Widgets.renderWidgetType("WillStrohl.Widgets.IconSwitcher");
// END: IconSwitcher class
