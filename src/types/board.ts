export interface Board {
  id: string;
  title: string;
  description?: string;
  code: string;
  createdAt: Date;
  updatedAt: Date;
  ownerId: string;
  ownerName: string;
  memberCount: number;
  members: BoardMember[];
}

export interface BoardMember {
  id: string;
  name: string;
  email: string;
  role: 'owner' | 'member';
  joinedAt: Date;
}

export interface CreateBoardData {
  title: string;
  description?: string;
}