import { useState, useEffect, useCallback } from 'react';

interface UseVoiceInputProps {
  onResult: (transcript: string) => void;
  language?: string;
}

export const useVoiceInput = ({ onResult, language = 'en-US' }: UseVoiceInputProps) => {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      setIsSupported(true);
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = language;

      recognitionInstance.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        onResult(transcript);
        setIsListening(false);
      };

      recognitionInstance.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    } else {
      setIsSupported(false);
    }
  }, [language, onResult]);

  const startListening = useCallback(() => {
    if (recognition && !isListening) {
      recognition.lang = language;
      recognition.start();
      setIsListening(true);
    }
  }, [recognition, isListening, language]);

  const stopListening = useCallback(() => {
    if (recognition && isListening) {
      recognition.stop();
      setIsListening(false);
    }
  }, [recognition, isListening]);

  return {
    isListening,
    isSupported,
    startListening,
    stopListening,
  };
};
