import React from 'react';
import ConditionalRender from '../../ConditionalRender';

interface MemoryProps {
    url: string;
    landing_asset?: {
        url: string;
    };
    title: string;
    images_count: number;
    year: number;
}

const MemoryAnnouncement: React.FC<MemoryProps> = (props) => {
    const { url, landing_asset, title, images_count, year } = props;
    const memory_asset = landing_asset?.url || null;

    return (
        <div>
            <div style={{ padding: '20px 15px', minHeight: '1%', overflow: 'hidden' }}>
                <a href={url} style={{ display: 'block' }}>
                    <div>
                        <ConditionalRender if={!!memory_asset}>
                            <img 
                                src={memory_asset} 
                                alt="Memory" 
                                width="300" 
                                height="300" 
                                style={{ objectFit: 'cover', width: '100%', verticalAlign: 'middle' }} 
                            />
                        </ConditionalRender>
                        <div style={{ padding: '16px' }}>
                            <div style={{ float: 'left', padding: '0px 8px' }}>
                                <div className="text_heading ellipsis" style={{ maxWidth: '100%' }}>
                                    {title}
                                </div>
                                <div className="text_caption">
                                    {images_count} Pictures
                                </div>
                            </div>
                            <div className="text_title" style={{ float: 'left' }}>
                                '{year.toString().substring(2, 4)}
                            </div>
                            <div style={{ clear: 'both' }}></div>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    );
};

export default MemoryAnnouncement;