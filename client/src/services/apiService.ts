// API service for communicating with the medical bot backend

// Helper function to detect symptom categories (optional, can be moved to backend if needed)
const detectSymptomCategory = (symptoms: string): string => {
  const symptomText = symptoms.toLowerCase();

  if (symptomText.includes('fever') || symptomText.includes('temperature') || symptomText.includes('hot')) {
    return 'fever';
  } else if (symptomText.includes('headache') || symptomText.includes('head pain') || symptomText.includes('migraine')) {
    return 'headache';
  } else if (symptomText.includes('cough') || symptomText.includes('throat') || symptomText.includes('cold')) {
    return 'respiratory';
  } else if (symptomText.includes('stomach') || symptomText.includes('nausea') || symptomText.includes('vomit') || symptomText.includes('diarrhea')) {
    return 'digestive';
  } else if (symptomText.includes('rash') || symptomText.includes('skin') || symptomText.includes('itch')) {
    return 'skin';
  } else if (symptomText.includes('joint') || symptomText.includes('pain') || symptomText.includes('muscle') || symptomText.includes('back')) {
    return 'musculoskeletal';
  } else if (symptomText.includes('tired') || symptomText.includes('fatigue') || symptomText.includes('exhausted') || symptomText.includes('energy')) {
    return 'fatigue';
  } else if (symptomText.includes('dizzy') || symptomText.includes('faint') || symptomText.includes('vertigo')) {
    return 'dizziness';
  } else {
    return 'general';
  }
};

// Function to post symptoms and get advice from the backend
export const postSymptoms = async (symptoms: string): Promise<{ advice: string }> => {
  try {
    const response = await fetch('http://localhost:8000/api/openai/symptoms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: symptoms }),
    });

    if (!response.ok) throw new Error('Failed to fetch medical advice');
    return response.json();
  } catch (error) {
    console.error('Error posting symptoms:', error);
    throw new Error('Failed to get medical advice. Please try again later.');
  }
};

// Function to get first-aid advice for a condition from the backend
export const getFirstAid = async (condition: string): Promise<{ firstAid: string }> => {
  try {
    const response = await fetch('http://localhost:8000/api/openai/firstaid', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ condition }),
    });

    if (!response.ok) throw new Error('Failed to fetch first-aid advice');
    return response.json();
  } catch (error) {
    console.error('Error getting first aid advice:', error);
    throw new Error('Failed to get first-aid information. Please try again later.');
  }
};