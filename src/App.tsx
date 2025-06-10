import React, { useState, useEffect } from 'react';
import type { Card } from './types/Card';
import { CardStorage } from './utils/CardStorage';
import { BarcodeScanner } from './components/BarcodeScanner';
import { CardList } from './components/CardList';
import { CardForm } from './components/CardForm';
import { ManualBarcodeInput } from './components/ManualBarcodeInput';
import { SingleCardView } from './components/SingleCardView';
import './App.css';

type View = 'list' | 'scan' | 'manual' | 'form' | 'single-card';

function App() {
  const [cards, setCards] = useState<Card[]>([]);
  const [currentView, setCurrentView] = useState<View>('list');
  const [editingCard, setEditingCard] = useState<Card | null>(null);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [scannedCode, setScannedCode] = useState<string>('');
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    loadCards();
  }, []);

  const loadCards = () => {
    const loadedCards = CardStorage.getCards();
    setCards(loadedCards);
  };

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleScan = (code: string) => {
    const numericCode = code.replace(/\D/g, '');
    if (numericCode) {
      setScannedCode(numericCode);
      setCurrentView('form');
      showNotification('Barcode scanned successfully!', 'success');
    } else {
      showNotification('Invalid barcode format', 'error');
    }
  };

  const handleScanError = (error: string) => {
    showNotification(error, 'error');
  };

  const handleSaveCard = (card: Omit<Card, 'createdAt' | 'updatedAt'>) => {
    try {
      if (editingCard) {
        CardStorage.updateCard(editingCard.id, card);
        showNotification('Card updated successfully!', 'success');
      } else {
        CardStorage.addCard(card);
        showNotification('Card added successfully!', 'success');
      }
      loadCards();
      setCurrentView('list');
      setEditingCard(null);
      setScannedCode('');
    } catch (error) {
      showNotification('Failed to save card', 'error');
    }
  };

  const handleEditCard = (card: Card) => {
    setEditingCard(card);
    setCurrentView('form');
  };

  const handleCardClick = (card: Card) => {
    setSelectedCard(card);
    setCurrentView('single-card');
  };

  const handleBackToList = () => {
    setSelectedCard(null);
    setCurrentView('list');
  };

  const handleDeleteCard = (id: string) => {
    if (window.confirm('Are you sure you want to delete this card?')) {
      try {
        CardStorage.deleteCard(id);
        loadCards();
        showNotification('Card deleted successfully!', 'success');
      } catch (error) {
        showNotification('Failed to delete card', 'error');
      }
    }
  };

  const handleExport = () => {
    try {
      const exportData = CardStorage.exportCards();
      const blob = new Blob([exportData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `card-wallet-export-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showNotification('Cards exported successfully!', 'success');
    } catch (error) {
      showNotification('Failed to export cards', 'error');
    }
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const result = CardStorage.importCards(content);

        if (result.success) {
          loadCards();
          showNotification(`Successfully imported ${result.imported} cards!`, 'success');
        } else {
          showNotification(`Import failed: ${result.error}`, 'error');
        }
      } catch (error) {
        showNotification('Failed to read import file', 'error');
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'scan':
        return (
          <div>
            <BarcodeScanner
              onScan={handleScan}
              onError={handleScanError}
              isActive={true}
            />
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <button
                onClick={() => setCurrentView('manual')}
                className="action-button"
              >
                📝 Enter Code Manually
              </button>
            </div>
          </div>
        );
      case 'manual':
        return (
          <ManualBarcodeInput
            onScan={handleScan}
            onCancel={() => setCurrentView('scan')}
          />
        );
      case 'form':
        return (
          <CardForm
            card={editingCard}
            scannedCode={scannedCode}
            onSave={handleSaveCard}
            onCancel={() => {
              setCurrentView('list');
              setEditingCard(null);
              setScannedCode('');
            }}
          />
        );
      case 'single-card':
        return selectedCard ? (
          <SingleCardView
            card={selectedCard}
            onBack={handleBackToList}
            onEdit={handleEditCard}
            onDelete={handleDeleteCard}
          />
        ) : null;
      default:
        return (
          <CardList
            cards={cards}
            onCardClick={handleCardClick}
          />
        );
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎫 Card Wallet</h1>
        <p>Store and manage your fidelity cards</p>
      </header>

      <nav className="app-nav">
        <button
          className={`nav-button ${currentView === 'list' ? 'active' : ''}`}
          onClick={() => setCurrentView('list')}
        >
          📋 My Cards ({cards.length})
        </button>
        <button
          className={`nav-button ${currentView === 'scan' ? 'active' : ''}`}
          onClick={() => setCurrentView('scan')}
        >
          📱 Scan
        </button>
        <button
          className="nav-button"
          onClick={() => {
            setEditingCard(null);
            setScannedCode('');
            setCurrentView('form');
          }}
        >
          ➕ Add
        </button>
      </nav>

      <main className="app-main">
        {renderCurrentView()}
      </main>

      {currentView === 'list' && (
        <div className="app-actions">
          <button onClick={handleExport} className="action-button">
            💾 Export Cards
          </button>
          <label className="action-button file-input-label">
            📁 Import Cards
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              style={{ display: 'none' }}
            />
          </label>
        </div>
      )}

      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
    </div>
  );
}

export default App;
