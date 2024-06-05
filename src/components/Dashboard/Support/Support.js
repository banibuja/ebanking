import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar';
import { useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    body {
        background-color: #fff; /* Sfondi i bardhë për të gjithë faqen */
        color: #000; /* Ngjyra e tekstit */
        margin: 0;
        padding: 0;
        min-height: 100vh; /* Sigurohuni që trupi të shtrihet në të gjithë lartësinë e ekranit */
        display: flex;
        flex-direction: column;
    }

    #root {
        flex: 1;
        display: flex;
        flex-direction: column;
    }
`;

const Container = styled.div`
    display: flex;
    background-color: #fff; /* Sfondi i bardhë për container */
    flex: 1;
`;

const MainContent = styled.div`
    flex: 1;
    padding: 20px;
`;

const SupportContainer = styled.div`
    padding: 20px;
    background-color: #fff; /* Sfondi i bardhë */
    border-radius: 8px;
    max-width: 800px;
    margin: 0 auto;
`;

const Header = styled.h1`
    text-align: center;
    margin-bottom: 20px;
    color: #000; /* Ngjyra e tekstit */
`;

const Tabs = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
`;

const Tab = styled.button`
    padding: 10px 20px;
    margin: 0 5px;
    border: none;
    background-color: #fff;
    cursor: pointer;
    border-bottom: 2px solid transparent;
    color: #000; /* Ngjyra e tekstit */
    &.active {
        border-bottom: 2px solid #800000; /* Maroon color */
    }
`;

const Content = styled.div`
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    color: #000; /* Ngjyra e tekstit */
`;

const Section = styled.div`
    margin-bottom: 20px;
`;

const SectionHeader = styled.h2`
    font-size: 1.2em;
    margin-bottom: 10px;
    color: #000; /* Ngjyra e tekstit */
`;

const ContactInfo = styled.div`
    margin: 5px 0;
    color: #000; /* Ngjyra e tekstit */
`;

const Support = () => {
    const [activeTab, setActiveTab] = useState('contact');
    const [message, setMessage] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/sendMessage', { message });
            console.log('Message sent successfully');
            setIsSubmitted(true);
            setMessage('');
        } catch (error) {
            console.error('Error sending message', error);
        }
    };

    useEffect(() => {
        // Placeholder for any future effect logic
    }, []);

    return (
        <>
            <GlobalStyle />
            <Container>
                <Sidebar />
                <MainContent>
                    <SupportContainer>
                        <Header>Support</Header>
                        <Tabs>
                            <Tab
                                className={activeTab === 'contact' ? 'active' : ''}
                                onClick={() => handleTabClick('contact')}
                            >
                                Contact Us
                            </Tab>
                            <Tab
                                className={activeTab === 'messages' ? 'active' : ''}
                                onClick={() => handleTabClick('messages')}
                            >
                                Messages
                            </Tab>
                        </Tabs>
                        <Content>
                            {activeTab === 'contact' && (
                                <>
                                    <Section>
                                        <SectionHeader>Call Us</SectionHeader>
                                        <ContactInfo>
                                            <p><strong>General Enquiries</strong><br />8am to 9pm (Monday to Friday) and 9am to 8pm (Weekends) AEST</p>
                                            <p>Local: 1300 236 344</p>
                                            <p>Overseas: +38345963828</p>
                                        </ContactInfo>
                                    </Section>
                                    <Section>
                                        <SectionHeader>Can't find what you're looking for?</SectionHeader>
                                        <p>Our e-banking support centre has answers to many frequently asked questions.</p>
                                    </Section>
                                    <Section>
                                        <SectionHeader>Pay Anyone Cut-off Times</SectionHeader>
                                        <p>Pay Anyone payments excluding Osko and Fast Payments made before 7:00pm AEST on business banking days will be processed on the same day.</p>
                                    </Section>
                                    <Section>
                                        <SectionHeader>BPAY Cut-off Times</SectionHeader>
                                        <p>BPAY payments made before 6:30pm AEST on business banking days will be processed that night. Payments made after 6:30pm AEST, or on a weekend, public holiday or bank holiday will be processed on the next business banking day.</p>
                                    </Section>
                                    <Section>
                                        <SectionHeader>Telegraphic Transfer Cut-off Times</SectionHeader>
                                        <p>Telegraphic Transfer payments made after 3:00pm AEST, or on a weekend, public holiday or bank holiday will be processed on the next business banking day.</p>
                                    </Section>
                                </>
                            )}
                            {activeTab === 'messages' && (
                                <Section>
                                    <SectionHeader>Messages</SectionHeader>
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <textarea
                                                className="form-control"
                                                rows="5"
                                                value={message}
                                                onChange={handleMessageChange}
                                                placeholder="Write your message here"
                                                style={{ borderRadius: '25px', padding: '10px 20px', fontSize: '16px', border: '1px solid #ddd', color: '#000' }}
                                            ></textarea>
                                        </div>
                                        <button type="submit" className="btn btn-primary w-100" style={{ backgroundColor: '#EDC14A', border: 'none', borderRadius: '25px', fontSize: '18px', padding: '10px 20px', color: '#000' }}>
                                            Send Message
                                        </button>
                                        {isSubmitted && <p className="text-success text-center mt-2">Your message has been sent successfully!</p>}
                                    </form>
                                </Section>
                            )}
                        </Content>
                    </SupportContainer>
                </MainContent>
            </Container>
        </>
    );
};

export default Support;