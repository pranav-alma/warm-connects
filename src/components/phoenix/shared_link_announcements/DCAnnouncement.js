import React from 'react';
import ConditionalRender from '../ConditionalRender';
export const DCAnnouncement = (props) => {
    let campaign = props;
    let campaign_cover_pic = campaign.cover_picture ? campaign.cover_picture.url : null;
    return (
        <div>
            <a href={`/donations/${campaign.id}`} style={{display: 'block'}}>
                <ConditionalRender if={campaign_cover_pic}>
                <img style={{objectFit: 'cover', width: '100%',height: '244px'}}
                    src={campaign_cover_pic}>
                </img>
                </ConditionalRender>
            </a>
            <div style={{padding: '20px 15px', minHeight: '1%', overflow: 'hidden'}}>
                <a className='text_title_small ellipsis' href={`/donations/${campaign.id}`} target="_blank" style={{ maxWidth: '100%'}}>
                    {campaign.subject}
                </a>

                <div style={{margin: '8px -2px 0px'}}>
                    <div className='text_caption ellipsis' style={{maxWidth: '100%'}}>
                        <a href={campaign.contributor.url} className="text_caption_dark">{campaign.contributor.name}</a>
                        <ConditionalRender if={campaign.on_behalf_of}>
                        <span>
                            on behalf of {campaign.on_behalf_of}
                        </span>
                        </ConditionalRender>
                    </div>

                    <div style={{marginTop: '24px',marginBottom: '8px'}}>
                    <div style={{background: '#f8f8f8',height: '3px',width: '100%'}}></div>
                    <div style={{background: '#00c4b5',height: '3px',width: `${campaign.amount_donated_in_percent}%`,position: 'absolute',top: '0px'}}></div>
                    </div>

                    <div>
                        <div style={{float: 'left',width: 'calc(100% - 117px)',minWidth: '250px',marginBottom: '16px'}}>
                            <div style={{display: 'inline-block',paddingRight: '16px',textAlign: 'center'}}>
                                <div className="text_caption_dark">
                                    ₹ { campaign.amount_donated }
                                </div>
                                <div className="text_caption">
                                    Contributed
                                </div>
                            </div>

                            <div style={{display: 'inline-block',paddingRight: '16px',textAlign: 'center'}}>
                                <div className="text_caption_dark">
                                    ₹ { campaign.goal_amount }
                                </div>
                                <div className="text_caption">
                                    Goal Amount
                                </div>
                            </div>

                        </div>

                        <ConditionalRender if={!campaign.past_campaign}>
                        <a href={campaign.donate_url} className="ac_button" style={{float: 'left',marginBottom: '16px'}}>
                            Contribute
                        </a>
                        </ConditionalRender>

                        <div style={{clear: 'both'}}></div>
                    </div>

                </div>
            </div>
        </div>
    )
}