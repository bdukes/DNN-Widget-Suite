/*
SyntaxHighlighter Widget
Widget Suite for DotNetNuke
Author - Will Strohl (http://www.WillStrohl.com)
Project Contributors - Will Strohl (http://www.WillStrohl.com), Mark Allan (http://www.dnngarden.com), Armand Datema (http://www.schwingsoft.com)
Support - http://dnnwidgets.com
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
''' This widget script allows you to include external script files.
''' not enabled.
''' </summary>
''' <version>01.00.00</version>
''' <remarks>
''' </remarks>
''' <history>
''' [wstrohl] - 20110217 - Created
''' </history>
''' -----------------------------------------------------------------------------

EXAMPLE:
<object id="ANY-UNIQUE-ID-YOU-WANT" codetype="dotnetnuke/client" codebase="WillStrohl.Widgets.SyntaxHighlighter" declare="declare"> 
    <param name="debug" value="true" /> 
</object>
*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BEGIN: SyntaxHighlighter class                                                                              //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// BEGIN: Namespace management
Type.registerNamespace("WillStrohl.Widgets");
// END: Namespace management

WillStrohl.Widgets.SyntaxHighlighter = function(widget)
{
	WillStrohl.Widgets.SyntaxHighlighter.initializeBase(this, [widget]);
}

WillStrohl.Widgets.SyntaxHighlighter.prototype =
{
    // BEGIN: render
    render: function () {
        var widget = this._widget;

        (function ($) {
            // Default parameters
            var brushes = '';
            var debugEnabled = 'false';

            // Parse parameters
            $(widget).children().each(function () {
                if (this.name && this.value) {
                    var paramName = this.name.toLowerCase();
                    var paramValue = this.value;

                    switch (paramName) {
                        case 'debug': debugEnabled = paramValue; break;
                    }
                }
            });

            /* INITIATE THE DEBUGGER */
            var runDebug = false;
            if (debugEnabled == 'true') runDebug = true;

            if (runDebug) {
                if ($('#DebugConsole').length == 0) $('body').append('<div id="DebugConsole" class="DebugConsole"></div>');
                $DEBUGLINE('<span class="Head">Widget Suite: SyntaxHighlighter Debug Report</span><br />');
                $DEBUGLINE('<span class="SubHead">Parameters Values:</span>');
                $DEBUGLINE('debug = ' + debugEnabled);
                $DEBUGLINE('<br /><span class="SubHead">Activity Log:</span>');
            }

            if (runDebug) $DEBUGLINE('Including Script');

            try {

                if (runDebug) $DEBUGLINE('Loading CSS Files');

                /* add the core files */
                jQuery('head').append('<link id="lnkShCore" />');
                jQuery('#lnkShCore').attr({ rel: "stylesheet", type: "text/css", href: $dnn.baseResourcesUrl + 'Widgets/User/WillStrohl/js/SyntaxHighlighter/styles/shCore.css' });
                jQuery('head').append('<link id="lnkShThemeDefault" />');
                jQuery('#lnkShThemeDefault').attr({ rel: "stylesheet", type: "text/css", href: $dnn.baseResourcesUrl + 'Widgets/User/WillStrohl/js/SyntaxHighlighter/styles/shThemeDefault.css' });

                if (runDebug) $DEBUGLINE('Loading JavaScript Files');

                if (runDebug) $DEBUGLINE('Loading: ' + $dnn.baseResourcesUrl + 'Widgets/User/WillStrohl/js/SyntaxHighlighter/scripts/shCore.js');
                jQuery.getScript($dnn.baseResourcesUrl + 'Widgets/User/WillStrohl/js/SyntaxHighlighter/scripts/shCore.js');

                if (runDebug) $DEBUGLINE('Loading: ' + $dnn.baseResourcesUrl + 'Widgets/User/WillStrohl/js/SyntaxHighlighter/scripts/shAutoloader.js');
                jQuery.getScript($dnn.baseResourcesUrl + 'Widgets/User/WillStrohl/js/SyntaxHighlighter/scripts/shAutoloader.js', function () {

                    setTimeout(function () {

                        /* add the supported brushes */
                        if (runDebug) $DEBUGLINE('Load Brushes');
                        SyntaxHighlighter.autoloader.apply(null, path(
                            'applescript            @shBrushAppleScript.js',
                            'actionscript3 as3      @shBrushAS3.js',
                            'bash shell             @shBrushBash.js',
                            'coldfusion cf          @shBrushColdFusion.js',
                            'cpp c                  @shBrushCpp.js',
                            'c# c-sharp csharp      @shBrushCSharp.js',
                            'css                    @shBrushCss.js',
                            'delphi pascal          @shBrushDelphi.js',
                            'diff patch pas         @shBrushDiff.js',
                            'erl erlang             @shBrushErlang.js',
                            'groovy                 @shBrushGroovy.js',
                            'java                   @shBrushJava.js',
                            'jfx javafx             @shBrushJavaFX.js',
                            'js jscript javascript  @shBrushJScript.js',
                            'perl pl                @shBrushPerl.js',
                            'php                    @shBrushPhp.js',
                            'text plain             @shBrushPlain.js',
                            'py python              @shBrushPython.js',
                            'ruby rails ror rb      @shBrushRuby.js',
                            'sass scss              @shBrushSass.js',
                            'scala                  @shBrushScala.js',
                            'sql                    @shBrushSql.js',
                            'vb vbnet               @shBrushVb.js',
                            'xml xhtml xslt html    @shBrushXml.js'
                        ));

                        /* highlight the code */
                        if (runDebug) $DEBUGLINE('Calling SyntaxHighlighter.all();');
                        SyntaxHighlighter.all();
                        if (runDebug) $DEBUGLINE('Called SyntaxHighlighter.all();');

                    }, 250);

                });

            }
            catch (e) {
                if (runDebug) $DEBUGLINE('<span class="NormalRed">' + e + '</span>');
            }

            if (runDebug) $DEBUGLINE('<br /><span class="NormalRed">Widget Suite: SyntaxHighlighter Debug Report Complete</span>');

        })(jQuery);
    }
    // END: render
}

function path() {
    var args = arguments, result = [];
    for(var i = 0; i < args.length; i++) result.push(args[i].replace('@', $dnn.baseResourceUrl + 'Widgets/User/WillStrohl/js/SyntaxHighlighter/scripts/'));
    return result;
};

WillStrohl.Widgets.SyntaxHighlighter.inheritsFrom(DotNetNuke.UI.WebControls.Widgets.BaseWidget);
WillStrohl.Widgets.SyntaxHighlighter.registerClass("WillStrohl.Widgets.SyntaxHighlighter", DotNetNuke.UI.WebControls.Widgets.BaseWidget);
DotNetNuke.UI.WebControls.Widgets.renderWidgetType("WillStrohl.Widgets.SyntaxHighlighter");
// END: SyntaxHighlighter class
