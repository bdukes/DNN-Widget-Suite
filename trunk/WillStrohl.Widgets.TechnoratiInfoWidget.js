/*
Will Strohl - http://www.WillStrohl.com
Copyright (c) 2009 by Will Strohl
 
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
''' This widget script imports Technorati information widgets into a DNN 5+ page.
''' </summary>
''' <remarks>
''' The following Technorati widgets are supported:
''' Horizontal800px
''' Horizontal650px
''' Vertical400px
''' Vertical200px
''' News
''' TopSearches
''' TopTags
''' YourTopTags
''' 
''' Implement in your skins like this:
''' <object id="AnyName" codetype="dotnetnuke/client" codebase="WillStrohl.Widgets.TechnoratiInfoWidget" declare="declare">
''' <param name="widgetType" value="Vertical400px" />
''' </object>
''' </remarks>
''' <history>
''' [WillStrohl] - 20090111 - Created
''' </history>
''' -----------------------------------------------------------------------------
*/

/* BEGIN: Namespace management */
Type.registerNamespace("WillStrohl.Widgets");
/* END: Namespace management */

WillStrohl.Widgets.TechnoratiInfoWidget = function(widget) {
    WillStrohl.Widgets.TechnoratiInfoWidget.initializeBase(this, [widget]);
}

WillStrohl.Widgets.TechnoratiInfoWidget.prototype =
{
    /* BEGIN: render */
    render:
        function() {
            var params = this._widget.childNodes;
            if (params != null) {
                var widgetType = 'Vertical400px';
                var blogUrl = '';
                for (var p = 0; p < params.length; p++) {
                    try {
                        var paramName = params[p].name.toLowerCase();
                        switch (paramName) {
                            case 'widgetType': widgetType = params[p].value; break;
                            case 'blogUrl': blogUrl = params[p].value; break;
                        }
                    }
                    catch (e) {
                    }
                }
            }

            if ((widgetType == 'YourTopTags' && blogUrl != '') || (widgetType != 'YourTopTags')) {

                var div = document.createElement('div');
                var tScript = document.createElement('script');
                var tAnchor = document.createElement('a');
                tScript.setAttribute('src', 'http://widgets.technorati.com/t.js');
                tScript.setAttribute('type', 'text/javascript');
                tScript.setAttribute('language', 'JavaScript');
                div.appendChild(tScript);

                switch (widgetType) {
                    case 'Horizontal800px':
                        // <script src="http://widgets.technorati.com/t.js" type="text/javascript"> </script> 
                        // <a href="http://technorati.com/?sub=tr_searches-horizontal-ticker_t_js" class="tr_searches-horizontal-ticker_t_js" style="color:#4261DF">View technorati.com</a>
                        tAnchor.setAttribute('href', 'http://technorati.com/?sub=tr_searches-horizontal-ticker_t_js');
                        tAnchor.setAttribute('class', 'tr_searches-horizontal-ticker_t_js');
                        tAnchor.setAttribute('style', 'color:#4261DF');
                        tAnchor.innerHTML = 'View technorati.com';
                        div.appendChild(tAnchor);
                    case 'Horizontal650px':
                        // <script src="http://widgets.technorati.com/t.js" type="text/javascript"> </script>
                        // <a href="http://technorati.com/?sub=tr_searches-small-horizontal-ticker_t_js" class="tr_searches-small-horizontal-ticker_t_js" style="color:#4261DF">View technorati.com</a>
                        tAnchor.setAttribute('href', 'http://technorati.com/?sub=tr_searches-small-horizontal-ticker_t_js');
                        tAnchor.setAttribute('class', 'tr_searches-small-horizontal-ticker_t_js');
                        tAnchor.setAttribute('style', 'color:#4261DF');
                        tAnchor.innerHTML = 'View technorati.com';
                        div.appendChild(tAnchor);
                    case 'Vertical400px':
                        // <script src="http://widgets.technorati.com/t.js" type="text/javascript"> </script>
                        // <a href="http://technorati.com/?sub=tr_searches-vertical-ticker_t_js" class="tr_searches-vertical-ticker_t_js" style="color:#4261DF">View technorati.com</a>
                        tAnchor.setAttribute('href', 'http://technorati.com/?sub=tr_searches-vertical-ticker_t_js');
                        tAnchor.setAttribute('class', 'tr_searches-vertical-ticker_t_js');
                        tAnchor.setAttribute('style', 'color:#4261DF');
                        tAnchor.innerHTML = 'View technorati.com';
                        div.appendChild(tAnchor);
                    case 'Vertical200px':
                        // <script src="http://widgets.technorati.com/t.js" type="text/javascript"> </script>
                        // <a href="http://technorati.com/?sub=tr_searches-small-vertical-ticker_t_js" class="tr_searches-small-vertical-ticker_t_js" style="color:#4261DF">View technorati.com</a>
                        tAnchor.setAttribute('href', 'http://technorati.com/?sub=tr_searches-small-vertical-ticker_t_js');
                        tAnchor.setAttribute('class', 'tr_searches-small-vertical-ticker_t_js');
                        tAnchor.setAttribute('style', 'color:#4261DF');
                        tAnchor.innerHTML = 'View technorati.com';
                        div.appendChild(tAnchor);
                    case 'News':
                        // <script src="http://widgets.technorati.com/t.js" type="text/javascript"> </script>
                        // <a href="http://technorati.com/?sub=tr_top-news_t_js" class="tr_top-news_t_js" style="color:#4261DF">View top news</a>
                        tAnchor.setAttribute('href', 'http://technorati.com/?sub=tr_top-news_t_js');
                        tAnchor.setAttribute('class', 'tr_top-news_t_js');
                        tAnchor.setAttribute('style', 'color:#4261DF');
                        tAnchor.innerHTML = 'View technorati.com';
                        div.appendChild(tAnchor);
                    case 'TopSearches':
                        // <script src="http://widgets.technorati.com/t.js" type="text/javascript"> </script>
                        // <a href="http://technorati.com/pop/?sub=tr_top-searches_t_ns" class="tr_top-searches_t_js" style="color:#4261DF">Technorati Top Searches</a>
                        tAnchor.setAttribute('href', 'http://technorati.com/pop/?sub=tr_top-searches_t_ns');
                        tAnchor.setAttribute('class', 'tr_top-searches_t_js');
                        tAnchor.setAttribute('style', 'color:#4261DF');
                        tAnchor.innerHTML = 'View technorati.com';
                        div.appendChild(tAnchor);
                    case 'TopTags':
                        // <script src="http://widgets.technorati.com/t.js" type="text/javascript"> </script>
                        // <a href="http://technorati.com/tag/?sub=tr_global-tagcloud_t_ns" class="tr_global-tagcloud_t_js" style="color:#4261DF">Technorati Top Tags</a>
                        tAnchor.setAttribute('href', 'http://technorati.com/tag/?sub=tr_global-tagcloud_t_ns');
                        tAnchor.setAttribute('class', 'tr_global-tagcloud_t_js');
                        tAnchor.setAttribute('style', 'color:#4261DF');
                        tAnchor.innerHTML = 'View technorati.com';
                        div.appendChild(tAnchor);
                    case 'YourTopTags':
                        // <script src="http://widgets.technorati.com/t.js" type="text/javascript"> </script>
                        // <a href="http://technorati.com/blogs/{URL}?sub=tr_tagcloud_t_ns" class="tr_tagcloud_t_js" style="color:#4261DF">View blog top tags</a>
                        tAnchor.setAttribute('href', 'http://technorati.com/blogs/' + blogUrl + '?sub=tr_tagcloud_t_ns');
                        tAnchor.setAttribute('class', 'tr_tagcloud_t_js');
                        tAnchor.setAttribute('style', 'color:#4261DF');
                        tAnchor.innerHTML = 'View blog top tags';
                        div.appendChild(tAnchor);
                }

                //            var tTech = document.createElement('script');
                //            tTech.appendChild('type', 'text/javascript');
                //            tTech.appendChild('language', 'JavaScript');
                //            tTech.innerHTML = 'Technorati.loadFunctions();';
                //            div.appendChild(tTech);

                WillStrohl.Widgets.TechnoratiInfoWidget.callBaseMethod(this, 'render', [div]);
            }
        }
    /* END: render */
}

WillStrohl.Widgets.TechnoratiInfoWidget.inheritsFrom(DotNetNuke.UI.WebControls.Widgets.BaseWidget);
WillStrohl.Widgets.TechnoratiInfoWidget.registerClass('WillStrohl.Widgets.TechnoratiInfoWidget', DotNetNuke.UI.WebControls.Widgets.BaseWidget);
DotNetNuke.UI.WebControls.Widgets.renderWidgetType('WillStrohl.Widgets.TechnoratiInfoWidget');
/* END: WillStrohlWidget class */
