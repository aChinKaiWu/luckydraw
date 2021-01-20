defmodule LuckyDrawWeb.Resolver.Lottery do
  alias LuckyDraw.Lottery

  def list_awards(_, _args, _) do
    {:ok, Lottery.list_awards()}
  end

  def add_award(_, args, _) do
    Lottery.create_award(args)
  end

  def edit_award(_, %{id: id} = args, _) do
    id
    |> Lottery.get_award!()
    |> Lottery.update_award(args)
  end

  def delete_award(_, %{id: id}, _) do
    award = Lottery.get_award!(id)

    set_candidate_not_winner_if_exist(award)

    Lottery.delete_award(award)
  end

  def list_candidates(_, _, _) do
    {:ok, Lottery.list_candidates()}
  end

  def draw_winner(_, %{award_id: id}, _) do
    {:ok, candidate} =
      Lottery.list_candidates()
      |> Enum.reject(& &1.is_winner)
      |> Enum.random()
      |> Lottery.update_candidate(%{is_winner: true})

    id
    |> Lottery.get_award!()
    |> Lottery.update_award(%{winner: candidate.id})

    {:ok, candidate}
  end

  def give_up_award(_, %{award_id: id}, _) do
    award = Lottery.get_award!(id)

    set_candidate_not_winner_if_exist(award)

    award
    |> Lottery.update_award(%{winner: nil})
  end

  defp set_candidate_not_winner_if_exist(award) do
    if award.winner do
      award.winner
      |> Lottery.get_candidate!()
      |> Lottery.update_candidate(%{is_winner: false})
    end
  end
end
