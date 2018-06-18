
export default function injectTapEventPlugin() {
	require('react-dom')
	.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
	.EventPluginHub
	.injection
	.injectEventPluginsByName({
		'TapEventPlugin': {
			extractEvents: function(topLevelType, targetInst, nativeEvent, nativeEventTarget) {
				var event = null;
				return event;
			}
		}
	})
}
