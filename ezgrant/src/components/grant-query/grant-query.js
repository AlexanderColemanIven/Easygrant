// Import necessary modules and components
import React, { useState, useRef, useEffect } from "react";
import { 
    EnvironmentOutlined, DollarCircleOutlined, CalendarOutlined, 
    TagsOutlined, UserOutlined, IdcardOutlined, LinkOutlined, 
    InfoCircleOutlined, CheckCircleOutlined 
} from '@ant-design/icons';  // Import Ant Design icons
import { useClickOutside } from '../../hooks/useClickOutside';  // Import custom hook
import { Card } from 'antd';  // Import Ant Design Card component
import './grant-query.css';  // Import custom CSS
// Define a constant for the field keys
const FIELD_KEYS = {
    NAME: "NAME",
    LOCATION: "LOCATION",
    AMOUNT: "AMOUNT",
    DEADLINE: "DEADLINE",
    CATEGORY: "CATEGORY",
    SPONSOR: "SPONSOR",
    LINK: "LINK",
    ABOUT: "ABOUT",
    // ELIGIBILITY: "ELIGIBILITY", // Ignored as per your instruction
  };
  
  // Define a mapping of field keys to their icons
  const FIELD_ICONS = {
    [FIELD_KEYS.NAME]: <IdcardOutlined />,
    [FIELD_KEYS.LOCATION]: <EnvironmentOutlined />,
    [FIELD_KEYS.AMOUNT]: <DollarCircleOutlined />,
    [FIELD_KEYS.DEADLINE]: <CalendarOutlined />,
    [FIELD_KEYS.CATEGORY]: <TagsOutlined />,
    [FIELD_KEYS.SPONSOR]: <UserOutlined />,
    [FIELD_KEYS.LINK]: <LinkOutlined />,
    [FIELD_KEYS.ABOUT]: <InfoCircleOutlined />,
    // ... Add other mappings as needed
  };
export const Grant = (props) => {
    // State to manage whether the card is expanded or not
    const [isExpanded, setIsExpanded] = useState(false);

    // Reference to the grant container for click outside functionality
    const grantRef = useRef(null);
   
    // Function to toggle the expanded/collapsed state of the card
    const handleExpandCollapse = () => {
        const body = document.body;
        setIsExpanded(!isExpanded);        
    };

    // Use custom hook to handle click outside the card to collapse it
    useClickOutside(grantRef, () => {
        if (isExpanded) {
            setIsExpanded(false);
        }
    });

    return (
      // Main container for the grant card
      <div data-testid="grant-container" ref={grantRef} className={`grant-card${isExpanded ? "grant-card--expanded" : "grant-card--collapsed"}`}>
        <Card
          // Handle card click to expand/collapse, avoid action if an anchor tag is clicked
          onClick={(e) => {
            if (e.target.tagName.toLowerCase() !== 'a') {
              handleExpandCollapse();
            }
          }}
          title={
            <div className="grant-card__title">
            {props.grant.find(field => field[0] === FIELD_KEYS.NAME)[1]}
          </div>
          }
          // Extra contains the collapse/expand toggle
          extra={<a onClick={handleExpandCollapse} className="grant-card__read-more">{isExpanded ? "Collapse" : "Expand"}</a>}
          // Dynamic styling based on expanded state
        >
          {/* Conditionally render the grant details if the card is expanded */}
          {isExpanded && (
            <>
              {props.grant.map(([object_key, value], index) => {
                // Use the FIELD_ICONS mapping to get the appropriate icon
                let icon = FIELD_ICONS[object_key] || null;
        
                // Generate the field display
                return (
                  <div key={index} className="grant-card__content">
                    <span className="grant-field-icon">{icon}</span>
                    <span className="grant-field-name">{object_key}: </span>
                    <span className="grant-field-value">{value}</span>
                  </div>
                ); 
              })}
            </>
          )}
            <div className="grant-action-links">
            <a href="#" className="grant-apply-link" >Apply</a>
            <a href="#" className="grant-about-link">About</a>
            </div>
        </Card>
      </div>
    );
    
      
};