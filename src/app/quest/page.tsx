import QuestWizard from '@/components/quest/QuestWizard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pickle Pool | Free NFT Quest',
  description: 'Complete simple quests to register for the exclusive Pickle Pool FREE NFT mint on Base chain.',
};

export default function QuestPage() {
  return <QuestWizard />;
}
