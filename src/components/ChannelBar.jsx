import React from 'react'

var ChannelBar = React.createClass({
	render: function() {
		return (
			<div className="channels-wrapper flex-vertical">
				<div className="channels">
					<div className="channels-whispers">
						<i className="fa fa-comments fa-2x"></i>
					</div>
					<div className="channels-text">
						AYY LMAO
					</div>
					
					<div className="channels-separator"></div>

					<div className="channels-channel" style={{backgroundImage: "url('https://static-cdn.jtvnw.net/jtv_user_pictures/goldglove-profile_image-ebb22ee6cccace23-300x300.png')", backgroundSize: '48px'}}></div>

				</div>
			</div>
		)
	}
})

export default ChannelBar