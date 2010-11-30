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
''' This widget script adds an image to external links found in the page.
''' </summary>
''' <version>01.00.00</version>
''' <remarks>
''' </remarks>
''' <history>
''' [wstrohl] - 20101129 - Created
''' </history>
''' -----------------------------------------------------------------------------

EXAMPLE:
<object id="wgtExternalLinks" codetype="dotnetnuke/client" codebase="WillStrohl.Widgets.ExternalLinks" declare="declare">
</object>

<object id="wgtExternalLinks" codetype="dotnetnuke/client" codebase="WillStrohl.Widgets.ExternalLinks" declare="declare">
	<param name="altText" value="Opens to New Site" />
	<param name="image" value="/images/edit.gif" />
</object>
*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BEGIN: ExternalLinks class                                                                              //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// BEGIN: Namespace management
Type.registerNamespace("WillStrohl.Widgets");
// END: Namespace management

WillStrohl.Widgets.ExternalLinks = function(widget)
{
    WillStrohl.Widgets.ExternalLinks.initializeBase(this, [widget]);
}

WillStrohl.Widgets.ExternalLinks.prototype =
{
    // BEGIN: render
    render:
        function()
        {
			
			/* set-up parameters */
            var params = this._widget.childNodes;
            if (params != null)
            {
				/* default parameters */
				var altText = 'external link';
				//var customFilter = 'a:not(:has(img))';
				//var customFilter = 'a:not(:has(> img:first-child))';
                var image = '/Resources/Widgets/User/WillStrohl/images/external-link.png';
				
				/* parse parameters */
                for (var p = 0; p < params.length; p++)
                {
					try
                    {
						var paramName = params[p].name.toLowerCase();
						switch (paramName)
						{
							case "alttext": altText = params[p].value; break;
							//case "customfilter": customFilter = params[p].value; break;
							case "image": image = params[p].value; break;
						}
                    }
                    catch (e)
                    {
						//alert('An Error Occurred: ' + e);
                    }
                }
            }
			
			try
			{
				jQuery('a').filter(function() {
					return this.hostname && this.hostname !== location.hostname;
				}).each(function(index, Element) {
					if (jQuery(this).has('img').length == 0) {
						jQuery(this).append(' <img src="' + image + '" alt="' + altText + '" />');
					}
				});
			}
			catch (e)
			{
				//alert('An Error Occurred: ' + e);
			}
			
        }
    // END: render
}

WillStrohl.Widgets.ExternalLinks.inheritsFrom(DotNetNuke.UI.WebControls.Widgets.BaseWidget);
WillStrohl.Widgets.ExternalLinks.registerClass("WillStrohl.Widgets.ExternalLinks", DotNetNuke.UI.WebControls.Widgets.BaseWidget);
DotNetNuke.UI.WebControls.Widgets.renderWidgetType("WillStrohl.Widgets.ExternalLinks");
// END: ExternalLinks class
