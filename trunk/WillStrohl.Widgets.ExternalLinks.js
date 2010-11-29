/*
Will Strohl - http://www.WillStrohl.com
Copyright (c) 2010 by Will Strohl
 
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated 
documentation files (the "Software"), to deal in the Software without restriction, including without limitation 
the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and 
to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 
The above copyright notice and this permission notice shall be included in all copies or substantial portions 
of the Software.
 
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED 
TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL 
THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF 
CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
DEALINGS IN THE SOFTWARE.

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
			alert('widget initialized');
			
			/* set-up parameters */
            var params = this._widget.childNodes;
            if (params != null)
            {
				/* default parameters */
				var altText = 'external link';
				var customFilter = 'a';
                var image = '/Resources/Widgets/User/WillStrohl/images/external-link.png';
				
				/* parse parameters */
                for (var p = 0; p < params.length; p++)
                {
                    try
                    {
						if (params.count > 0){
							var paramName = params[p].name.toLowerCase();
							switch (paramName)
							{
								case "alttext": altText = params[p].value; break;
								case "customfilter": customFilter = params[p].value; break;
								case "image": text = params[p].value; break;
							}
						}
                    }
                    catch (e)
                    {
						alert('Error: ' + e);
                    }
                }
            }
			
			alert('before widget code');
            
			jQuery(customFilter).filter(function() {
				return this.hostname && this.hostname !== location.hostname;
			}).append(' <img src="' + image + '" alt="' + altText + '" />');
			
			alert('widget complete');
        }
    // END: render
}

WillStrohl.Widgets.ExternalLinks.inheritsFrom(DotNetNuke.UI.WebControls.Widgets.BaseWidget);
WillStrohl.Widgets.ExternalLinks.registerClass("WillStrohl.Widgets.ExternalLinks", DotNetNuke.UI.WebControls.Widgets.BaseWidget);
DotNetNuke.UI.WebControls.Widgets.renderWidgetType("WillStrohl.Widgets.ExternalLinks");
// END: ExternalLinks class
