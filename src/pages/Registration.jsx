import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import pookolamImg from '../assets/pookolam.png';
import duoDanceImg from '../assets/duo_dance_real.jpg';
import fashionParadeImg from '../assets/fashion_parade.png';
import tugOfWarImg from '../assets/tug_of_war.png';

const DEPARTMENTS = [
  'AIDS', 'AIML', 'AUTOMOBILE', 'MECH', 'MTS', 'CIVIL', 'ECE', 
  'EEE', 'CSE', 'IT', 'CSD', 'E&I', 'FT', 'CHEM', 'S&H', 
  'CT-UG', 'MSC', 'MBA', 'MCA'
];

const EVENT_REQUIREMENTS = {
  'Pookolam': 4, // 1 leader + 4 members
  'Duo Dance': 1,
  'Fashion Parade': 4,
  'Tug Of War': 6
};

// Helper for auto-calculating year based on roll number
const calculateYear = (rollNo, department) => {
  if (['CT-UG', 'MSC', 'MBA', 'MCA'].includes(department)) return null;
  if (rollNo.length >= 2) {
    const prefix = rollNo.substring(0, 2);
    if (prefix === '26') return '1';
    if (prefix === '25') return '2';
    if (prefix === '24') return '3';
    if (prefix === '23') return '4';
  }
  return null;
};

const Registration = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const queryParams = new URLSearchParams(location.search);
  const eventParam = queryParams.get('event') || '';

  const [event, setEvent] = useState(eventParam);
  
  const [leaderData, setLeaderData] = useState({
    name: '',
    rollNo: '',
    email: '',
    department: '',
    year: '1'
  });

  const [teamMembers, setTeamMembers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [rulesAccepted, setRulesAccepted] = useState(false);

  // Update team members array when event changes
  useEffect(() => {
    const requiredMembers = EVENT_REQUIREMENTS[event] || 0;
    
    setTeamMembers(prev => {
      const newMembers = [...prev];
      if (newMembers.length < requiredMembers) {
        // Add more members
        while (newMembers.length < requiredMembers) {
          newMembers.push({ name: '', rollNo: '', department: '', year: '1' });
        }
      } else if (newMembers.length > requiredMembers) {
        // Remove extra members
        newMembers.splice(requiredMembers);
      }
      return newMembers;
    });
  }, [event]);

  // Handle Leader year auto-calculation
  useEffect(() => {
    const autoYear = calculateYear(leaderData.rollNo, leaderData.department);
    if (autoYear && autoYear !== leaderData.year) {
      setLeaderData(prev => ({ ...prev, year: autoYear }));
    }
  }, [leaderData.rollNo, leaderData.department]);

  const handleLeaderChange = (e) => {
    setLeaderData({ ...leaderData, [e.target.name]: e.target.value });
  };

  const handleMemberChange = (index, field, value) => {
    setTeamMembers(prev => {
      const updated = [...prev];
      updated[index][field] = value;
      
      // Auto-calculate year if rollNo or department changed
      if (field === 'rollNo' || field === 'department') {
        const autoYear = calculateYear(updated[index].rollNo, updated[index].department);
        if (autoYear) updated[index].year = autoYear;
      }
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!leaderData.email.endsWith('@kongu.edu')) {
      setEmailError(t('email_error'));
      return;
    }
    setEmailError('');
    
    try {
      const formData = new FormData();
      formData.append('event', event);
      formData.append('leaderData', JSON.stringify(leaderData));
      formData.append('teamMembers', JSON.stringify(teamMembers));
      
      // Audio file support has been removed

      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to submit registration');
      }

      const result = await response.json();
      console.log('Backend response:', result);
      setSubmitted(true);
    } catch (error) {
      console.error('Submission error:', error);
      alert(t('error_submit'));
    }
  };

  if (submitted) {
    return (
      <div className="registration-page">
        <div className="success-message">
          <h2>{t('registration_successful')}</h2>
          <p>{t('thank_you')} {leaderData.name}. {t('look_forward')}</p>
          <button className="btn-primary" onClick={() => navigate('/events')}>
            {t('register_another')}
          </button>
        </div>
      </div>
    );
  }

  const renderYearOptions = (department, value, onChange, name) => {
    const isManual = ['CT-UG', 'MSC', 'MBA', 'MCA'].includes(department);
    return (
      <select 
        id={name} 
        name={name} 
        value={value} 
        onChange={onChange} 
        required 
        disabled={!isManual}
        style={{ 
          opacity: !isManual ? 0.6 : 1, 
          cursor: !isManual ? 'not-allowed' : 'auto' 
        }}
      >
        <option value="1">{t('year_1')}</option>
        <option value="2">{t('year_2')}</option>
        <option value="3">{t('year_3')}</option>
        <option value="4">{t('year_4')}</option>
      </select>
    );
  };

  const getBackgroundImage = (eventName) => {
    switch (eventName) {
      case 'Pookolam': return '/pookolam.jpg';
      case 'Duo Dance': return duoDanceImg;
      case 'Fashion Parade': return '/kathakali_dancer_bg.png';
      case 'Tug Of War': return tugOfWarImg;
      default: return '/king_mahabali_bg.png';
    }
  };

  return (
    <>
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundImage: `url(${getBackgroundImage(event)})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundColor: 'var(--bg-dark)',
      zIndex: -1,
      opacity: 0.85,
      transition: 'background-image 0.8s ease-in-out'
    }}></div>
    <div className="registration-page">
      <div className="registration-card" style={{ maxWidth: '800px' }}>
        <button type="button" className="btn-back" onClick={() => navigate(-1)}>
          {t('back_btn')}
        </button>
        <h2>{t('register_for')} {event || "OnamFest '26"}</h2>
        <p style={{ marginBottom: '1.5rem' }}>
          {t('fill_form')}
          {event && <span style={{ display: 'block', marginTop: '0.5rem', color: 'var(--primary-color)', fontWeight: '600' }}> {t('condition_prefix')} {event} {t('condition_suffix')} {EVENT_REQUIREMENTS[event] + 1} {t('condition_members')} (1 {t('condition_leader')} + {EVENT_REQUIREMENTS[event]} {t('condition_member_plural')}).</span>}
        </p>
        
        <form onSubmit={handleSubmit} className="registration-form">

          <h3 style={{ marginBottom: '1rem', color: 'var(--primary-color)', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>{t('team_leader_details')}</h3>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="leaderName">{t('full_name')}</label>
              <input type="text" id="leaderName" name="name" value={leaderData.name} onChange={handleLeaderChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="leaderRollNo">{t('roll_no')}</label>
              <input type="text" id="leaderRollNo" name="rollNo" value={leaderData.rollNo} onChange={handleLeaderChange} required />
            </div>
          </div>
          
          <div className="form-group" style={{ position: 'relative' }}>
            <label htmlFor="leaderEmail">{t('college_email')}</label>
            <input 
              type="email" 
              id="leaderEmail" 
              name="email" 
              value={leaderData.email} 
              onChange={handleLeaderChange} 
              onFocus={() => setIsEmailFocused(true)}
              onBlur={() => setIsEmailFocused(false)}
              required 
            />
            {isEmailFocused && !leaderData.email.endsWith('@kongu.edu') && (
              <div style={{
                position: 'absolute',
                top: '-30px',
                right: '0',
                background: 'var(--primary-color)',
                color: '#fff',
                padding: '0.3rem 0.6rem',
                borderRadius: '6px',
                fontSize: '0.8rem',
                boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
                pointerEvents: 'none',
                zIndex: 10,
                animation: 'fadeIn 0.2s ease'
              }}>
                {t('email_error')}
              </div>
            )}
            {emailError && <p style={{ color: '#EF4444', fontSize: '0.9rem', marginTop: '0.5rem' }}>{emailError}</p>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="leaderDept">{t('department')}</label>
              <select id="leaderDept" name="department" value={leaderData.department} onChange={handleLeaderChange} required>
                <option value="">{t('select_dept')}</option>
                {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="leaderYear">Year of Study</label>
              {renderYearOptions(leaderData.department, leaderData.year, handleLeaderChange, "year")}
            </div>
          </div>

          {teamMembers.length > 0 && (
            <div style={{ marginTop: '2rem' }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--primary-color)', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>{t('team_members')}</h3>
              {teamMembers.map((member, index) => (
                <div key={index} style={{ padding: '1.5rem', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '8px', marginBottom: '1rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <h4 style={{ marginBottom: '1rem', fontSize: '1rem', color: 'var(--text-muted)' }}>{t('member')} {index + 1}</h4>
                  <div className="form-row">
                    <div className="form-group">
                      <label>{t('full_name')}</label>
                      <input type="text" value={member.name} onChange={(e) => handleMemberChange(index, 'name', e.target.value)} required />
                    </div>
                    <div className="form-group">
                      <label>{t('roll_no')}</label>
                      <input type="text" value={member.rollNo} onChange={(e) => handleMemberChange(index, 'rollNo', e.target.value)} required />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>{t('department')}</label>
                      <select value={member.department} onChange={(e) => handleMemberChange(index, 'department', e.target.value)} required>
                        <option value="">{t('select_dept')}</option>
                        {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>{t('year_of_study')}</label>
                      {renderYearOptions(member.department, member.year, (e) => handleMemberChange(index, 'year', e.target.value), `member-year-${index}`)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="rules-section" style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '8px', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
            <h3 style={{ color: 'var(--primary-color)', marginBottom: '1rem', fontSize: '1.2rem' }}>{t('rules_and_regulations')}</h3>
            <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>{t('rules_1')}</li>
              <li style={{ marginBottom: '0.5rem' }}>{t('rules_2')}</li>
              <li>{t('rules_3')}</li>
            </ul>
            <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}>
              <input 
                type="checkbox" 
                id="agreeRules" 
                checked={rulesAccepted}
                onChange={(e) => setRulesAccepted(e.target.checked)}
                required 
                style={{ width: '18px', height: '18px', marginTop: '2px', accentColor: 'var(--primary-color)' }} 
              />
              <label htmlFor="agreeRules" style={{ fontSize: '0.95rem', cursor: 'pointer' }}>{t('accept_rules')}</label>
            </div>
          </div>

          <button 
            type="submit" 
            className="btn-primary submit-btn" 
            disabled={!rulesAccepted}
            style={{ 
              marginTop: '2rem', 
              opacity: rulesAccepted ? 1 : 0.5, 
              cursor: rulesAccepted ? 'pointer' : 'not-allowed' 
            }}
          >
            {t('submit_registration')}
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default Registration;
