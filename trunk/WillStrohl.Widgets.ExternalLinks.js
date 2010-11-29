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
            var params = this._widget.childNodes;
            if (params != null)
            {
                var image = "/Resources/Widgets/User/WillStrohl/images/external-link.gif";
                for (var p = 0; p < params.length; p++)
                {
                    try
                    {
                        var paramName = params[p].name.toLowerCase();
                        switch (paramName)
                        {
                            case "image": text = params[p].value; break;
                        }
                    }
                    catch (e)
                    {
                    }
                }
            }
            var div = document.createElement("div");
            div.setAttribute("style", "width:100px;height:100px;border:solid 4px red");
            div.innerHTML = text;
            $addHandler(div, "click", WillStrohl.Widgets.ExternalLinks.clickHandler);
            WillStrohl.Widgets.ExternalLinks.callBaseMethod(this, "render", [div]);
        }
    // END: render
}

WillStrohl.Widgets.ExternalLinks.clickHandler = function(sender)
{
    var clickedObject = sender.target;
    alert("The widget with ID=" + clickedObject.id + " contains text \"" + clickedObject.innerHTML + "\"");
}

WillStrohl.Widgets.ExternalLinks.inheritsFrom(DotNetNuke.UI.WebControls.Widgets.BaseWidget);
WillStrohl.Widgets.ExternalLinks.registerClass("WillStrohl.Widgets.ExternalLinks", DotNetNuke.UI.WebControls.Widgets.BaseWidget);
DotNetNuke.UI.WebControls.Widgets.renderWidgetType("WillStrohl.Widgets.ExternalLinks");
// END: ExternalLinks class
