import React from 'react';
import ConditionalRender from '../ConditionalRender';
export const MemoryAnnouncement = (props) => {
    let memory = props
    let memory_asset = memory.landing_asset ? memory.landing_asset.url : null
    return (
        <div>
            <div style={{padding: '20px 15px', minHeight: '1%', overflow: 'hidden'}}>
                <a href={memory.url} style={{display: 'block'}}>
                    <div>
                        <ConditionalRender if = {memory_asset}>
                        <img src={memory.landing_asset.url} alt="Memory" width="300" height="300" style={{objectFit: 'cover',width: '100%',verticalAlign: 'middle'}}>
                        </img>
                        </ConditionalRender>
                        <div style={{padding: '16px'}}>
                            <div style={{float: 'left',padding: '0px 8px'}}>
                                <div className="text_heading ellipsis" style={{maxWidth: '100%'}}>
                                    { memory.title }
                                </div>
                                <div className="text_caption">
                                    { memory.images_count } Pictures
                                </div>
                            </div>
                            <div className="text_title" style={{float: 'left'}}>
                                '{ memory.year.toString().substring(2, 4) }
                            </div>
                            <div style={{clear: 'both'}}></div>
                        </div>
                    </div>
                </a>

            </div>
        </div>
    )
}